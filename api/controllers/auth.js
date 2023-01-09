import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    })

    await newUser.save()
    res.status(200).json(newUser)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) return res.status(404).send("User not found")

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if (!isPasswordValid) return res.status(400).json("Wrong credentials")

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    )

    const { password, isAdmin, ...others } = user._doc

    res
      .cookie("access_token", token, {
        httpOnly: true, // it doesn't allow any client secret to access the cookie
      })
      .status(200)
      .json({ ...others })
  } catch (error) {
    res.status(500).json(error)
  }
}