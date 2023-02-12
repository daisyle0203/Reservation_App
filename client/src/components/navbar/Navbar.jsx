import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import "./navbar.scss"

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext)

  const handleClick = () => {
    dispatch({ type: "LOGOUT", payload: null })
  }

  const navigate = useNavigate()

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
          <div>
            <button className="navButton">{user.username}</button>
            <button onClick={handleClick} className="navButton">Logout</button>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton">Sign up</button>
            <button onClick={e => navigate('/login')} className="navButton">Login</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
