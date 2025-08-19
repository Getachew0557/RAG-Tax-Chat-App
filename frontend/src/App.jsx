import { useState } from 'react'
import ChatWindow from './components/ChatWindow'
import LanguageToggle from './components/LanguageToggle'
import logo from './assets/logo.png'

function App() {
  const [language, setLanguage] = useState('en') // Default to English
  const [sessionId, setSessionId] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-10 w-10" />
          <h1 className="text-2xl font-bold">Tax Chat Assistant</h1>
        </div>
        <LanguageToggle language={language} setLanguage={setLanguage} />
      </header>

      {/* Chat Window */}
      <main className="flex-grow p-4">
        <ChatWindow language={language} sessionId={sessionId} setSessionId={setSessionId} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-3">
        <p>&copy; 2025 Tax Chat App. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
