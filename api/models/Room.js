const mongoose = require ("mongoose")

const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    // unavailable Dates for reserved room, so nobody can book this room, but default it is empty.
    // eg: {number: 101, unavailableDates: [02.02.2023, 02.08.2023]}
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }], 
  },
  { timestamps: true }
)

module.exports = mongoose.model("Room", RoomSchema)
