import { useState } from "react"
import { NavLink } from "react-router-dom"
import DeleteAllCacheModalWindow from "./UI/DeleteAllCacheModalWindow"

function Navbar() {
  const [modalOpen, setModalOpen] = useState(false)

  const showModal = () => {
    setModalOpen(true)
  }

  return (
    <nav className='container-nav'>
      <DeleteAllCacheModalWindow
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      <div class='nav-wrapper cyan lighten-1'>
        <NavLink to={"/"} className='brand-logo'>
          Todo app
        </NavLink>
        <ul id='nav-mobile' className='right hide-on-med-and-down '>
          <li>
            <NavLink to='/'>Список дел</NavLink>
          </li>
          <li>
            <NavLink to='/history'>История дел</NavLink>
          </li>
          <li>
            <NavLink to='/info'>Информация</NavLink>
          </li>
          <li>
            <NavLink onClick={showModal}>Очистить дела и их историю</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
