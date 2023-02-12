import Navbar from "../../components/navbar/Navbar"
import MailList from "../../components/mailList/MailList"
import Footer from "../../components/footer/Footer"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./signup.scss"

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  })

  const { loading, error, dispatch } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()

    dispatch({ type: "SIGNUP_START" })

    try {
      const res = await axios.post("/auth/signup", credentials)
      dispatch({ type: "SIGNUP_SUCCESS", payload: res.data })
      navigate("/login")
    } catch (err) {
      dispatch({ type: "SIGNUP_FAILURE", payload: err.response.data })
    }
  }

  return (
    <div>
      <Navbar />
      <div className="signup">
        <div className="sContainer">
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={handleChange}
            className="sInput"
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            onChange={handleChange}
            className="sInput"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="sInput"
          />
          <button disabled={loading} onClick={handleClick} className="sButton">
            Sign Up
          </button>
          {error && <span>{error.message}</span>}
        </div>
      </div>
      <MailList />
      <Footer />
    </div>
  )
}

export default SignUp
