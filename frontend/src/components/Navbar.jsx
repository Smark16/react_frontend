import React, { useContext } from 'react'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.jpeg'
import './main.css'
import { Link } from 'react-router-dom';
import { AuthContext } from './Context';
function Navbar() {
  const {user} = useContext(AuthContext)
  return (
   <>
   <nav className="navbar navbar-expand-lg bg-primary text-white">
  <div className="container-fluid">
    {user && (<>
      <Link to='/'>
      <img src={logo} className='logo'/>
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

<ul className='infolist'>
  <li>
    <Link to='/personal' className='text-white'>Personal Information</Link>
  </li>
  <li>
  <Link to='/employer' className='text-white'>Employer Information</Link>
  </li>
</ul>

<div className="navbar-nav ms-auto">
        <div className="credts bg-white">

        <Link to='/logout'>
          Logout
        </Link>
        </div>
      </div>
    </div>
    </>)}

    {!user && (<>
      <Link to='#'>
      <img src={logo} className='logo'/>
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

<div className="navbar-nav ms-auto">
        <div className="credts bg-white">
        <Link to='/login'>
          Login
        </Link>

        </div>
      </div>
    </div>
    </>)}
   
  
     
  </div>
</nav>

   </>
  )
}

export default Navbar
