const dotenv = require("dotenv")
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const authRoute = require("./routes/auth.js")
const hotelsRoute = require("./routes/hotels.js")
const usersRoute = require("./routes/users.js")
const roomsRoute = require("./routes/rooms.js")
const path = require("path")

const app = express()
dotenv.config()
const PORT = process.env.PORT || 8800

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

// routes
app.use("/api/auth", authRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/users", usersRoute)
app.use("/api/rooms", roomsRoute)

app.use(express.static(path.join(__dirname, "/client/build")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"))
})

// middleware for error handling
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong!"

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  })
})

app.listen(PORT, () => {
  connect()
  console.log(`Server is running on port ${PORT} 🚀`)
})
