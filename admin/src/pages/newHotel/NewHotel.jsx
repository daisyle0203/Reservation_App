import "./newHotel.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined"
import { useState } from "react"
import { hotelInputs } from "../../formInfo"
import useFetch from "../../hooks/useFetch"
import axios from "axios"

const NewHotel = () => {
  const [files, setFiles] = useState("")
  const [info, setInfo] = useState({})
  const [rooms, setRooms] = useState([])
  const { data, loading, error } = useFetch("/rooms")

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSelect = (e) => {
    // change selected options from HTMLCollection to array and only get value from option
    const value = Array.from(e.target.selectedOptions, (option) => option.value)
    console.log(value)
    // set room state with selected options
    setRooms(value)
  }

  console.log(files)

  const handleClick = async (e) => {
    e.preventDefault()

    try {
      // upload images to cloudinary
      const list = await Promise.all(
        // convert image file objects to array
        Object.values(files).map(async (file) => {
          const data = new FormData()
          data.append("file", file)
          data.append("upload_preset", "upload")
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/duu1qbe8l/image/upload",
            data
          )

          // get url from cloudinary
          const { url } = uploadRes.data

          return url
        })
      )

      // create new hotel object with all info and images url from cloudinary
      const newHotel = {
        ...info,
        rooms,
        photos: list,
      }

      // send new hotel object to server
      await axios.post("/hotels", newHotel)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="newHotel">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewHotel
