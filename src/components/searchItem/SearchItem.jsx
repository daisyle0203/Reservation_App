import "./searchItem.css"

const SearchItem = () => {
  return (
    <div className="searchItem">
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/418250294.jpg?k=efd6611daa3320295b5dae1c83612b87ec603d4f4e741cf596a4ae28cb35a556&o=&hp=1"
        alt="a living room with a round table with 3 chairs and a mini bar station"
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">Hostal Evoke Madrid</h1>
        <span className="siDistance">500m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Located in the center of Madrid.
        </span>
        <span className="siFeatures">
          24-hour front desk, rooms with private bathrooms.
        </span>
        <span className="siCancelOp">Free cancellation</span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Excellent</span>
          <button>8.9</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">$115</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton">See availability</button>
        </div>
      </div>
    </div>
  )
}

export default SearchItem
