const express = require ("express")
const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require ("../controllers/user.js")
const { verifyToken, verifyUser, verifyAdmin } = require ("../utils/verifyToken.js")

const router = express.Router()

// // CHECK IF USER IS LOGGED IN WITH VERIFY TOKEN
// router.get("/checkuser", verifyToken, (req, res, next) => {
//   res.send("hello user, you are logged in")
// })

// // CHECK IF USER IS LOGGED IN WITH VERIFY USER TOKEN
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("hello user, you are logged in and you can delete your account")
// })

// // CHECK IF USER IS LOGGED IN WITH VERIFY ADMIN TOKEN
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("hello admin, you are logged in and you can delete all accounts")
// })

//UPDATE ONE USER
router.put("/:id",verifyUser, updateUser)

//DELETE ONE USER
router.delete("/:id",verifyUser, deleteUser)

//GET ONE USER
router.get("/:id",verifyUser, getUser)

//GET ALL USERS
router.get("/",verifyAdmin, getUsers)

module.exports = router
