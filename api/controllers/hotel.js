const Hotel = require ("../models/Hotel.js")
const Room = require ("../models/Room.js")

const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body)

  try {
    const savedHotel = await newHotel.save()
    res.status(200).json(savedHotel)
  } catch (error) {
    next(error)
  }
}

const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updatedHotel)
  } catch (error) {
    next(error)
  }
}
const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id)
    res.status(200).json("Hotel has been deleted...")
  } catch (error) {
    next(error)
  }
}

const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    res.status(200).json(hotel)
  } catch (error) {
    next(error)
  }
}

const getHotels = async (req, res, next) => {
  // destructure the query object to get the min and max price values and the rest of the query object
  const { min, max, ...others } = req.query
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gte: min || 1, $lte: max || 999 },
    }).limit(req.query.limit)
    res.status(200).json(hotels)
  } catch (error) {
    next(error)
  }
}

const countByCity = async (req, res, next) => {
  // transform the cities string into an array
  const cities = req.query.cities.split(",")
  try {
    // map over the cities array and return a promise for each city
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city })
      })
    )
    res.status(200).json(list)
  } catch (err) {
    next(err)
  }
}

const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" })
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" })
    const resortCount = await Hotel.countDocuments({ type: "resort" })
    const villaCount = await Hotel.countDocuments({ type: "villa" })
    const cabinCount = await Hotel.countDocuments({ type: "cabin" })

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ])
  } catch (err) {
    next(err)
  }
}

const getHotelRooms = async (req, res, next) => {
  try {
    // find the hotel by id first
    const hotel = await Hotel.findById(req.params.id)
    // map over the rooms array and return a promise for each room
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room)
      })
    )

    res.status(200).json(list)
  } catch (error) {
    next(error)
  }
}

module.exports = { createHotel, updateHotel, deleteHotel, getHotel, getHotels, countByCity, countByType, getHotelRooms }  
