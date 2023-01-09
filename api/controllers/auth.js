import User from "../models/User.js"

export const signup = async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })

    await newUser.save()
    res.status(200).json(newUser)
  } catch (error) {
    res.status(500).json(error)
  }
}
