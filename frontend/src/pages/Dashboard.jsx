
import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-blue-100 to-gray-200">
      <div className="max-w-4xl mx-auto p-6 text-center fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
          Welcome to Tax Chat
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Your multilingual assistant for navigating Ethiopia's tax system. Ask questions in Amharic or English and get instant, accurate answers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/chat"
            className="bg-blue-600 text-white p-4 rounded-lg shadow-md hover:bg-blue-700 transition transform hover:scale-105"
          >
            Start Chatting
          </Link>
          <Link
            to="/about"
            className="bg-gray-200 text-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-300 transition transform hover:scale-105"
          >
            Learn More
          </Link>
          <Link
            to="/contact"
            className="bg-gray-200 text-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-300 transition transform hover:scale-105"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
