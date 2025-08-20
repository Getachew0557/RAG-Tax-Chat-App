
import { useState } from 'react'
import ChatWindow from '../components/ChatWindow'
import LanguageToggle from '../components/LanguageToggle'

function ChatPage() {
  const [language, setLanguage] = useState('en')
  const [sessionId, setSessionId] = useState(null)

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4">
      <div className="mb-4">
        <LanguageToggle language={language} setLanguage={setLanguage} />
      </div>
      <ChatWindow language={language} sessionId={sessionId} setSessionId={setSessionId} />
    </div>
  )
}

export default ChatPage
