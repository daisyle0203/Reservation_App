import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import "./navbar.scss"

const Navbar = () => {
  const { user } = useContext(AuthContext)

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link
          to="/"
          className="logo"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <span className="logo">StayZen</span>
        </Link>
        {user ? (
          <button className="navButton">{user.username}</button>
        ) : (
          <div className="navItems">
            <button className="navButton">Sign up</button>
            <button className="navButton">Login</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
