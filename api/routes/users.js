import express from "express"
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js"
import { verifyToken } from "../utils/verifyToken.js"

const router = express.Router()

router.get("/checkuser", verifyToken, (req,res,next)=>{
  res.send("hello user, you are logged in")
})

//UPDATE ONE USER
router.put("/:id", updateUser)

//DELETE ONE USER
router.delete("/:id", deleteUser)

//GET ONE USER
router.get("/:id", getUser)

//GET ALL USERS
router.get("/", getUsers)

export default router
