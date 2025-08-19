 

import axios from 'axios'

const API_URL = 'http://localhost:8000/api'

export const sendMessage = async (message, sessionId, language) => {
  try {
    const response = await axios.post(`${API_URL}/chat`, {
      message,
      session_id: sessionId,
      language
    })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Failed to send message')
  }
}