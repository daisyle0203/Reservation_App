import User from "../models/User.js"
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

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
