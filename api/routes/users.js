import express from "express"
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js"

const router = express.Router()

//UPDATE ONE USER
router.put("/:id", updateUser)

//DELETE ONE USER
router.delete("/:id", deleteUser)

//GET ONE USER
router.get("/:id", getUser)

//GET ALL USERS
router.get("/", getUsers)

export default router
