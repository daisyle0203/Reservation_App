import { Link } from "react-router-dom"
import "./navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" className="logo" style={{color: "inherit", textDecoration: "none"}}
        >
        <span className="logo">DaisyBooking</span>
        </Link>
        <div className="navItems">
          <button className="navButton">Sign up</button>
          <button className="navButton">Login</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
