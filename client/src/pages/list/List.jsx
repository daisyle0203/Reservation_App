import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import ListSearch from "../../components/listSearch/ListSearch"
import "./list.css"

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
