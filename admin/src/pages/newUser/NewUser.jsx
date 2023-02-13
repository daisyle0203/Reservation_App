import "./newUser.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined"
import { useState } from "react"
import axios from "axios"

const NewUser = ({ inputs, title }) => {
  const [file, setFile] = useState("")
  const [info, setInfo] = useState({})

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()

    // create form data to send to cloudinary
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "upload")

    try {
      // upload image to cloudinary and get url back in response data object  
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/duu1qbe8l/image/upload",
        data
      )
      console.log(uploadRes.data)
       
      // destructure url from response
      const { url } = uploadRes.data

      // create new user with image url and other info from form
      const newUser = {
        ...info, 
        img: url,
      }

      await axios.post("/auth/signup", newUser)
    } catch (err) {
      console.log(err)
    }
  }
  console.log(info)

  return (
    <div className="newUser">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
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
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewUser
