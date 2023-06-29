import Navbar from "../Navbar"

function NotFound() {
  return (
    <>
      <Navbar></Navbar>
      <div className='not-found'>
        <h1 className='not-found-text'>Page not found ERROR: 404.</h1>
      </div>
    </>
  )
}

export default NotFound
