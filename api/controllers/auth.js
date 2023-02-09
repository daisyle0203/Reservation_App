import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createError } from "../utils/error.js"

export const signup = async (req, res, next) => {
  try {
    // Hash the password
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)

    // Create a new user in the database
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    })

    // Save the user in the database
    await newUser.save()
    // Send the user back to the frontend
    res.status(200).send("User created successfully")
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    // Check if the user exists in the database
    const user = await User.findOne({ username: req.body.username })
    // If the user doesn't exist, return an error
    if (!user) return next(createError(400, "User doesn't exist"))

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    )
    // If the password is not correct, return an error
    if (!isPasswordValid) return next(createError(400, "Wrong password"))
    
    // Create a token if password is correct to identify if the user is admin or not
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    )
    // Remove the password from the user object
    const { password, isAdmin, ...others } = user._doc

    // Send the token to the frontend
    res
      .cookie("access_token", token, {
        httpOnly: true, // it doesn't allow any client secret to access the cookie
      })
      .status(200)
      .json({ details: { ...others }, isAdmin })
  } catch (error) {
    next(error)
  }
}
