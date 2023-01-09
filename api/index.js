import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"

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

app.listen(8800, () => {
  connect()
  console.log("Connected to backend!")
})
