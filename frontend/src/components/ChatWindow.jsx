 

import { useState, useEffect, useRef } from 'react'
import { sendMessage } from '../services/api'

function ChatWindow({ language, sessionId, setSessionId }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { text: input, sender: 'user' }
    setMessages([...messages, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await sendMessage(input, sessionId, language)
      setSessionId(response.session_id)
      const botMessage = { text: response.response, sender: 'bot' }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage = {
        text: language === 'am'
          ? 'ስህተት ተከስቷል። እባክዎ እንደገና ይሞክሩ።'
          : 'An error occurred. Please try again.',
        sender: 'bot'
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg flex flex-col h-[80vh]">
      {/* Chat Messages */}
      <div className="flex-grow p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}
          >
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="chat-bubble-bot animate-pulse">
            {language === 'am' ? 'በመጫን ላይ...' : 'Loading...'}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={language === 'am' ? 'መልእክትዎን ያስገቡ...' : 'Enter your message...'}
            className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows="2"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
          >
            {language === 'am' ? 'ላክ' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatWindow
