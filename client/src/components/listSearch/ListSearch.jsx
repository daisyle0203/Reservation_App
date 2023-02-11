import { useLocation } from "react-router-dom"
import { useState } from "react"
import { format } from "date-fns"
import { DateRange } from "react-date-range"
import SearchItem from "../../components/searchItem/SearchItem"
import useFetch from "../../hooks/useFetch"
import "./listSearch.scss"

const ListSearch = () => {
  const location = useLocation()
  console.log(location)
  const [destination, setDestination] = useState(
    location.state ? location.state.destination : ""
  )
  const [date, setDate] = useState(
    location.state
      ? location.state.date
      : [{ startDate: new Date(), endDate: new Date() }]
  )
  const [options, setOptions] = useState(
    location.state ? location.state.options : { adult: 1, children: 0, room: 1 }
  )
  const [openDate, setOpenDate] = useState(false)
  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  )
  console.log(data)

  const handleClick = () => {
    reFetch()
  }

  return (
    <div className="listWrapper">
      <div className="listSearch">
        <h1 className="lsTitle">Search</h1>
        {/* DESTINATION INPUT */}
        <div className="lsItem">
          <label>Destination</label>
          <input placeholder={destination} type="text" />
        </div>
        {/* DATE INPUT */}
        <div className="lsItem">
          <label>Check-in Date</label>
          <span onClick={() => setOpenDate(!openDate)}>{`${format(
            date[0].startDate,
            "MM/dd/yyyy"
          )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
          {openDate && (
            <DateRange
              onChange={(item) => setDate([item.selection])}
              minDate={new Date()}
              ranges={date}
            />
          )}
        </div>
        {/* PEOPLE AND ROOM OPTIONS */}
        <div className="lsItem">
          <label>Options</label>
          <div className="lsOptions">
            <div className="lsOptionItem">
              <span className="lsOptionText">
                Min price <small>per night</small>
              </span>
              <input
                type="number"
                onChange={(e) => setMin(e.target.value)}
                className="lsOptionInput"
              />
            </div>
            <div className="lsOptionItem">
              <span className="lsOptionText">
                Max price <small>per night</small>
              </span>
              <input
                type="number"
                onChange={(e) => setMax(e.target.value)}
                className="lsOptionInput"
              />
            </div>
            <div className="lsOptionItem">
              <span className="lsOptionText">Adult</span>
              <input
                type="number"
                min={1}
                className="lsOptionInput"
                placeholder={options.adult}
              />
            </div>
            <div className="lsOptionItem">
              <span className="lsOptionText">Children</span>
              <input
                type="number"
                min={0}
                className="lsOptionInput"
                placeholder={options.children}
              />
            </div>
            <div className="lsOptionItem">
              <span className="lsOptionText">Room</span>
              <input
                type="number"
                min={1}
                className="lsOptionInput"
                placeholder={options.room}
              />
            </div>
          </div>
        </div>
        {/* SEARCH LIST BUTTON */}
        <button onClick={handleClick}>Search</button>
      </div>
      {/* SEARCH ITEM RESULTS */}
      <div className="listResult">
        {loading ? (
          "Loading please wait..."
        ) : (
          <>
            {data.map((item) => (
              <SearchItem item={item} key={item._id} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default ListSearch
