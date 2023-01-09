import express from "express"
import Hotel from "../models/Hotel.js"

const router = express.Router()

//CREATE
router.post("/", async (req, res) => {
    const newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (err) {
        res.status(500).json(err)
    }
} )

//UPDATE
// router.put("/:id", )
//DELETE
// router.delete("/:id", )
//GET
// router.get("/find/:id", )
//GET ALL
// router.get("/", )
// router.get("/countByCity", )
// router.get("/countByType", )
// router.get("/room/:id", )

export default router
