import express from "express"
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
  countByCity,
  countByType,
  getHotelRooms,
} from "../controllers/hotel.js"
import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router()

//CREATE A HOTEL
router.post("/",verifyAdmin, createHotel)

//UPDATE A HOTEL BY ID
router.put("/:id",verifyAdmin, updateHotel)

//DELETE A HOTEL BY ID
router.delete("/:id",verifyAdmin, deleteHotel)

//GET A SPECIFIC HOTEL BY ID
router.get("/find/:id", getHotel)

//GET ALL HOTELS
router.get("/", getHotels)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/room/:id", getHotelRooms)

export default router
