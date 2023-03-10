const Room = require ("../models/Room.js")
const Hotel = require ("../models/Hotel.js")
const { createError } = require ("../utils/error.js")

const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid
  const newRoom = new Room(req.body)

  try {
    // save new room to the database
    const savedRoom = await newRoom.save()
    // Update the hotel model with the new room id
    try {
      // add room id to the hotel
      await Hotel.findByIdAndUpdate(hotelId, {
        // push room id to the rooms array of the hotel model
        $push: { rooms: savedRoom._id },
      })
    } catch (err) {
      next(err)
    }
    // send the saved room back to the client
    res.status(200).json(savedRoom)
  } catch (err) {
    next(err)
  }
}

const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updatedRoom)
  } catch (err) {
    next(err)
  }
}

const updateRoomAvailability = async (req, res, next) => {
  try {
    // use updateOne instead of findByIdAndUpdate because we need to update unavailableDates
    const updatedRoom = await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    ) 
    res.status(200).json("Room availability has been updated.")
  } catch (err) {
    next(err)
  }
}

const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid

  try {
    await Room.findByIdAndDelete(req.params.id)
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      })
    } catch (err) {
      next(err)
    }
    res.status(200).json("Room has been deleted.")
  } catch (err) {
    next(err)
  }
}

const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id)
    res.status(200).json(room)
  } catch (err) {
    next(err)
  }
}

const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find()
    res.status(200).json(rooms)
  } catch (err) {
    next(err)
  }
}

module.exports = { createRoom, updateRoom, updateRoomAvailability, deleteRoom, getRoom, getRooms }
