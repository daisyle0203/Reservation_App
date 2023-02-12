import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import useFetch from "../../hooks/useFetch"
import { useContext, useState } from "react"
import { SearchContext } from "../../context/SearchContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./reserve.scss"

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([])
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`)
  const { dates } = useContext(SearchContext)

  // function to get all dates between two chosen dates
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    // create a new date object with the start date
    const date = new Date(start.getTime())

    const dates = []

    // while the date is less than the end date, push the date to the array and add 1 day to the date
    while (date <= end) {
      // use getTime() to get the date in milliseconds, easier to compare
      dates.push(new Date(date).getTime())
      date.setDate(date.getDate() + 1)
    }

    return dates
  }

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate)

  // function to check if the room is available
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    )

    return !isFound
  }

  const handleSelect = (e) => {
    const checked = e.target.checked
    const value = e.target.value

    setSelectedRooms(
      checked
        ? // if checked, add the value to the array to the selectedRooms array
          [...selectedRooms, value]
        : // if unchecked, if the item does not match the value, item will stay in the array
          selectedRooms.filter((item) => item !== value)
    )
  }

  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: allDates,
          })
          return res.data
        })
      )
      setOpen(false)
      navigate("/")
    } catch (err) {}
  }
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
        {/* {error && <div>{error}</div>} */}
      </div>
    </div>
  )
}

export default Reserve
