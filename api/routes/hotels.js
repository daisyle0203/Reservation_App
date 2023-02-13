const express = require("express")
const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
  countByCity,
  countByType,
  getHotelRooms,
} = require("../controllers/hotel.js")
const { verifyAdmin } = require("../utils/verifyToken.js")

const router = express.Router()

//CREATE A HOTEL
router.post("/", verifyAdmin, createHotel)

//UPDATE A HOTEL BY ID
router.put("/:id", verifyAdmin, updateHotel)

//DELETE A HOTEL BY ID
router.delete("/:id", verifyAdmin, deleteHotel)

//GET A SPECIFIC HOTEL BY ID
router.get("/find/:id", getHotel)

//GET ALL HOTELS
router.get("/", getHotels)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/room/:id", getHotelRooms)

module.exports = router
