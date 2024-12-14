import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    const[isMenuOpen,setIsMenuOpen] = useState(false)


  return (

    <nav className="bg-gray-800 p-4">
    <div className="flex items-center justify-between">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-white focus:outline-none"
        aria-label="Toggle Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>
      <ul
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:flex gap-20 items-center`}
      >
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-white border-b-2 border-blue-500"
                : "text-gray-300 hover:text-white"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/upload"
            className={({ isActive }) =>
              isActive
                ? "text-white border-b-2 border-blue-500"
                : "text-gray-300 hover:text-white"
            }
          >
            upload
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/file' 
            className={({ isActive }) =>
              isActive
                ? "text-white border-b-2 border-blue-500"
                : "text-gray-300 hover:text-white"
            }
          >
            file
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
   
  )
}

export default Navbar