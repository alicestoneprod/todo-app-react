import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import DeleteAllCacheModalWindow from "./UI/DeleteAllCacheModalWindow"
import { Menu } from "antd"
function Navbar() {
  const [modalOpen, setModalOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const showModal = () => {
    setModalOpen(true)
  }
  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  }
  console.log(windowWidth)
  useEffect(() => {
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <nav className='container-nav'>
      <DeleteAllCacheModalWindow
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      <div className='nav-wrapper cyan lighten-1'>
        {windowWidth > 990 ? (
          <NavLink to={"/"} className='brand-logo'>
            Todo app
          </NavLink>
        ) : (
          <Menu
            className='mobile-menu'
            mode='horizontal'
            style={{ paddingBottom: "15px", backgroundColor: "#26c6da" }}>
            <Menu.Item key='todos'>
              <NavLink className='mobile-link' to='/'>
                Список дел
              </NavLink>
            </Menu.Item>
            <Menu.Item key='history'>
              <NavLink className='mobile-link' to='/history'>
                История дел
              </NavLink>
            </Menu.Item>
            <Menu.Item key='info'>
              <NavLink className='mobile-link' to='/info'>
                Информация
              </NavLink>
            </Menu.Item>
            <Menu.Item
              key='clear'
              onClick={showModal}
              style={{
                display: localStorage?.todosHistory?.length > 2 ? "" : "none",
              }}>
              Очистить дела и их историю
            </Menu.Item>
          </Menu>
        )}
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
            <NavLink
              onClick={showModal}
              style={{
                display: localStorage?.todosHistory?.length > 2 ? "" : "none",
              }}>
              Очистить дела и их историю
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
