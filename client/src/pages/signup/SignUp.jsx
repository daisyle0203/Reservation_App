import Navbar from "../../components/navbar/Navbar"
import MailList from "../../components/mailList/MailList"
import Footer from "../../components/footer/Footer"
import "./signup.scss"

const SignUp = () => {
  const handleChange = () => {}

  const handleClick = () => {}

  return (
    <div>
      <Navbar />
      <div className="login">
        <div className="lContainer">
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="lInput"
          />
          <button onClick={handleClick} className="lButton">
            Sign Up
          </button>
        </div>
      </div>
      <MailList />
      <Footer />
    </div>
  )
}

export default SignUp
