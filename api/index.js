import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
// import usersRoute from "./routes/users.js"
// import roomsRoute from "./routes/rooms.js"

const app = express()
dotenv.config()

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to mongoDB!")
  } catch (error) {
    throw error
  }
}

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!")
})

//middlewares
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoute)
app.use("/api/hotels", hotelsRoute)
// app.use("/api/users", usersRoute)
// app.use("/api/rooms", roomsRoute)

app.listen(8800, () => {
  connect()
  console.log("Connected to backend!")
})
