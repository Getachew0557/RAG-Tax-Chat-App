import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sendMessage } from '../services/api'

function ChatWindow({ language, sessionId, setSessionId }) {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chatHistory')
    return saved ? JSON.parse(saved) : []
  })
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages))
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const timestamp = new Date().toLocaleTimeString()
    const userMessage = { text: input, sender: 'user', timestamp }
    setMessages([...messages, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await sendMessage(input, sessionId, language)
      setSessionId(response.session_id)
      const botMessage = { text: response.response, sender: 'bot', timestamp: new Date().toLocaleTimeString() }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage = {
        text: language === 'am'
          ? 'ስህተት ተከስቷል። እባክዎ እንደገና ይሞክሩ።'
          : 'An error occurred. Please try again.',
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
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

  const handleClearChat = () => {
    setMessages([])
    localStorage.removeItem('chatHistory')
    setSessionId(null)
  }

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex flex-col h-[80vh]">
      {/* Chat Messages */}
      <div className="flex-grow p-4 md:p-6 overflow-y-auto">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={msg.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}
            >
              <div className="flex justify-between items-end">
                <span>{msg.text}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{msg.timestamp}</span>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="chat-bubble-typing"
            >
              <span>{language === 'am' ? 'ቦት በመፃፍ ላይ...' : 'Bot is typing...'}</span>
              <div className="flex space-x-1">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t dark:border-gray-700">
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={language === 'am' ? 'መልእክትዎን ያስገቡ...' : 'Enter your message...'}
              className="flex-grow p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 resize-none"
              rows="2"
              aria-label="Chat input"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="neumorphic-btn bg-blue-600 text-white px-4 py-2 rounded-xl disabled:bg-blue-300"
              aria-label="Send message"
            >
              {language === 'am' ? 'ላክ' : 'Send'}
            </button>
          </div>
          <button
            onClick={handleClearChat}
            className="neumorphic-btn bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 self-end"
            aria-label="Clear chat"
          >
            {language === 'am' ? 'ውይይቱን አጽዳ' : 'Clear Chat'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatWindow
