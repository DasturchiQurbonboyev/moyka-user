import React from 'react'
import "./Navbar.css"
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()

  const logOutSubmit = ()=>{
    localStorage.clear()
    navigate("/")
  }

  return (
    <>
      <div onClick={logOutSubmit} className='navbar'>
        <button className='log__out'>LOG OUT</button>
      </div>
    </>
  )
}

export default Navbar