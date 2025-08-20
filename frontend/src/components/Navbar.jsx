
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'

function Navbar() {
  return (
    <header className="bg-blue-600 text-white fixed top-0 left-0 right-0 shadow-md z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-10 w-10" />
          <h1 className="text-xl font-bold">Tax Chat Dashboard</h1>
        </div>
        <nav className="flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg transition ${
                isActive ? 'bg-white text-blue-600' : 'hover:bg-blue-800'
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg transition ${
                isActive ? 'bg-white text-blue-600' : 'hover:bg-blue-800'
              }`
            }
          >
            Chat
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg transition ${
                isActive ? 'bg-white text-blue-600' : 'hover:bg-blue-800'
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg transition ${
                isActive ? 'bg-white text-blue-600' : 'hover:bg-blue-800'
              }`
            }
          >
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
