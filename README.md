 
# RAG-Based Tax Chat Application
## Overview
The RAG Tax Chat Application is a bilingual (English and Amharic) chat-based assistant designed to answer tax-related queries in Ethiopia. It leverages Retrieval-Augmented Generation (RAG) to retrieve relevant tax information from a knowledge base and generate accurate, context-aware responses using the Gemini 2.0 Flash model. The application features a modern, responsive frontend with a sleek UI, dark mode, and chat history persistence, making it user-friendly and accessible.

## Features
- Bilingual Support: Handles queries in English and Amharic, with automatic language detection.
- Accurate Calculations: Performs precise numerical calculations (e.g., net salary) using a robust knowledge base and Gemini API.
- Modern UI: Responsive frontend with neumorphic design, animations, dark mode, and a sidebar for settings.
- Chat History: Persists chat messages across sessions using localStorage.
- Scalable Backend: Integrates Pinecone for vector search, MongoDB for session storage, and FastAPI for efficient API handling.
- Docker Support: Containerized for easy deployment.

## Tech Stack

### Backend

- FastAPI: High-performance Python web framework for building APIs.
- Gemini 2.0 Flash: AI model for generating accurate and multilingual responses.
- Pinecone: Vector database for efficient document retrieval.
- MongoDB: NoSQL database for storing chat sessions.
- Sentence Transformers: Generates embeddings for documents (paraphrase-multilingual-MiniLM-L12-v2).
- Python Libraries:
    - requests: For Gemini API calls.
    - pymongo: MongoDB client.
    - python-dotenv: Environment variable management.
    - langdetect: Language detection for queries.
    - uvicorn: ASGI server for FastAPI.

### Frontend

- React: JavaScript library for building the UI.
- Vite: Fast build tool and development server.
- Tailwind CSS: Utility-first CSS framework for styling.
- Framer Motion: Animation library for smooth transitions.
- Axios: HTTP client for API requests.
- Google Fonts: Noto Sans Ethiopic for Amharic support, Roboto for English.

### Deployment
- Docker: Containerizes backend and frontend for consistent deployment.
- MongoDB: Local or Atlas for session storage.

## Project Structure 
```bash 
rag-tax-chat-app/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   ├── routes.py
│   │   │   └── models.py
│   │   ├── rag/
│   │   │   ├── __init__.py
│   │   │   ├── pipeline.py
│   │   │   └── embeddings.py
│   │   ├── knowledge_base/
│   │   │   ├── documents/
│   │   │   │   ├── amharic/
│   │   │   │   │   ├── sample_tax_document_am.json
│   │   │   │   │   └── ethiopia_tax_rates_am.json
│   │   │   │   └── english/
│   │   │   │       ├── sample_tax_document_en.json
│   │   │   │       └── ethiopia_tax_rates_en.json
│   │   │   └── preprocess.py
│   │   ├── utils/
│   │   │   ├── __init__.py
│   │   │   └── language.py
│   │   └── main.py
│   ├── tests/
│   │   └── test_rag.py
│   ├── .env
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── LanguageToggle.jsx
│   │   │   └── ThemeToggle.jsx
│   │   ├── assets/
│   │   │   └── logo.png
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── services/
│   │       └── api.js
│   ├── public/
│   │   └── favicon.ico
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml
```

## Setup Instructions
### Prerequisites

- Python: Version 3.10 or higher for backend development.
- Node.js: Version 18.x or higher for React Vite frontend.
- MongoDB: Local installation or MongoDB Atlas.
- Docker: Optional for containerization and deployment.
- Pinecone Account: API key from pinecone.io.
- Gemini API Key: Provided or obtained from Google Cloud.

### Backend Setup

1. Create virtual environment
```bash 
python -m venv venv
venv\Scripts\activate
```
2. Install dependency

```bash 
pip install -r requirements.txt
```
3. Navigate to Backend Directory:
```bash 
cd rag-tax-chat-app/backend
```
4. Vector Database (Pinecone):

  - Sign up at pinecone.io and obtain an API key.
  - Alternatively, use FAISS locally (already installed via faiss-cpu).
5. Create .env File:
```bash
PINECONE_API_KEY=your-pinecone-api-key
MONGODB_URI=mongodb://localhost:27017/rag_tax_chat
GEMINI_API_KEY=AIzaSyCvKr-V1PRVpSr1Za72rRYDnKSUVfy6kC0
HF_HUB_DISABLE_SYMLINKS_WARNING=1
TF_ENABLE_ONEDNN_OPTS=0
```
Replace your-pinecone-api-key with your Pinecone API key.

6. Start MongoDB (if local):

```bash
net start MongoDB  # Windows
# OR
mongod  # Linux/Mac
```


7. Run Backend:

```bash
uvicorn app.main:app --reload
```
The API will be available at `http://localhost:8000`.

### Frontend Setup

1. Navigate to Frontend Directory:
```bash
cd rag-tax-chat-app/frontend
```
2. Install Dependencies:
```bash
npm install
```
3. Run Frontend:
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

### Docker Setup
1. Create docker-compose.yml
```bash
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - PINECONE_API_KEY=${PINECONE_API_KEY}
      - MONGODB_URI=${MONGODB_URI}
      - GEMINI_API_KEY=${GEMINI_API_KEY}
      - HF_HUB_DISABLE_SYMLINKS_WARNING=1
      - TF_ENABLE_ONEDNN_OPTS=0
    volumes:
      - ./backend:/app
  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    volumes:
      - ./frontend:/app
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
```
2. Run with Docker:
```bash
docker-compose up
```
## Usage

1. Access the App:
  - Open http://localhost:5173 in a browser.
  - Toggle between English and Amharic using the sidebar (or header on mobile).
  - Switch between light and dark modes.
2. Ask Questions:
  - Enter tax-related queries (e.g., "Calculate net salary if my gross salary is 25000 Birr with tax 35%").
  - Press "Send" or Enter to get responses.
  - Use the "Clear Chat" button to reset the conversation.

3. Example API Request:
```bash 
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Calculate net salary if my gross salary is 25000 Birr with tax 35%", "language": "en"}'
```
Expected Response:
```bash
{
  "response": "Your net salary is 16,250 Birr after a 35% tax on a gross salary of 25,000 Birr.",
  "session_id": "<uuid>",
  "language": "en"
}
```
Example Frontend Code (Sending a message):
```bash 
// frontend/src/services/api.js
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
```
Example Backend Code (Processing a query):
```bash
# backend/app/rag/pipeline.py
def process_query(self, query, language):
    retrieved_docs = self.embeddings.query(query, language, top_k=3)
    context = "\n".join([doc['text'] for doc in retrieved_docs])
    prompt = (
        f"Context: {context}\n\n"
        f"Question: {query}\n"
        f"Instructions: Provide a clear, concise, and accurate answer in {language}. "
        f"For numerical calculations, show step-by-step reasoning and ensure accuracy. "
        f"Do not repeat the question or context in the answer."
    )
    headers = {
        'Content-Type': 'application/json',
        'X-goog-api-key': self.gemini_api_key
    }
    data = {
        'contents': [{'parts': [{'text': prompt}]}]
    }
    response = requests.post(self.gemini_url, headers=headers, json=data)
    result = response.json()
    generated_text = result['candidates'][0]['content']['parts'][0]['text'].strip()
    cleaned_response = re.sub(r'^(Context|Question):.*?\n', '', generated_text, flags=re.MULTILINE)
    return cleaned_response
```

## License

MIT License. See LICENSE for details.

