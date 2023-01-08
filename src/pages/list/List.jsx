import "./list.css"
import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import ListSearch from "../../components/listSearch/ListSearch"

const List = () => {
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <ListSearch />
      </div>
    </div>
  )
}

export default List
