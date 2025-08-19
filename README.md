 
# RAG-Based Chat App 
## Objective
Set up the development environment on Windows and define the project file structure for a RAG-based chat application supporting Amharic and English for a legal taxing system, using React Vite with Tailwind CSS for the frontend.

## Environmental Setup
### Prerequisites

- Python: Version 3.10 or higher for backend development.
- Node.js: Version 18.x or higher for React Vite frontend.
- Docker: Optional for containerization and deployment.
- Git: For version control.
- IDE: VS Code recommended for coding.
- OS: Windows 10 or 11.

### Step 1: Install Dependencies

#### Python Environment:

- Download and install Python 3.10+ from python.org. Ensure "Add Python to PATH" is checked during installation.
- Open Command Prompt (cmd) or PowerShell and set up a virtual environment:
```bash 
python -m venv venv
venv\Scripts\activate
```


- Install core Python packages:
```bash 
pip install fastapi uvicorn transformers torch sentence-transformers langdetect faiss-cpu pinecone-client pymongo python-dotenv
```




#### Node.js and React Vite:

- Download and install Node.js 18.x from nodejs.org. Verify with node --version and npm --version.
- Initialize a React Vite project:
```bash 
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install axios @tailwindcss/vite
```


- Note: We use @tailwindcss/vite as specified in the provided vite.config.js instead of the standalone tailwindcss package.


#### Vector Database (Pinecone):

- Sign up at pinecone.io and obtain an API key.
- Alternatively, use FAISS locally (already installed via faiss-cpu).


#### MongoDB:

- Install MongoDB Community Edition from mongodb.com. Follow the Windows installation guide and ensure MongoDB service is running.
- Alternatively, use MongoDB Atlas for cloud hosting.
- Verify MongoDB: mongo --version in Command Prompt or connect via MongoDB Compass.
- Ensure MongoDB is accessible at mongodb://localhost:27017 or configure the Atlas connection string.

#### Docker (Optional for Deployment):

- Install Docker Desktop for Windows from docker.com. Enable WSL 2 if prompted.
- Verify: docker --version in Command Prompt or PowerShell.

#### Git:

- Install Git for Windows from git-scm.com.
- Verify: git --version.



### Step 2: Verify Environment

- Test Python: python --version
- Test Node.js: node --version
- Test MongoDB: mongo --version or connect via MongoDB Compass.
- Test Docker (if installed): docker --version
- Test Vite: cd frontend && npm run dev (should start a dev server at http://localhost:5173).

## Project File Structure
The project is organized into backend and frontend directories, with the frontend using React Vite and Tailwind CSS via the @tailwindcss/vite plugin.
```bash
rag-tax-chat-app/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   ├── routes.py        # FastAPI routes for chat and language detection
│   │   │   └── models.py        # Pydantic models for request/response
│   │   ├── rag/
│   │   │   ├── __init__.py
│   │   │   ├── pipeline.py      # RAG pipeline (retrieval + generation)
│   │   │   └── embeddings.py    # Document embedding creation
│   │   ├── knowledge_base/
│   │   │   ├── documents/
│   │   │   │   ├── amharic/     # Amharic tax documents (JSON/Markdown)
│   │   │   │   └── english/     # English tax documents (JSON/Markdown)
│   │   │   └── preprocess.py    # Script to preprocess and index documents
│   │   ├── utils/
│   │   │   ├── __init__.py
│   │   │   └── language.py      # Language detection and utilities
│   │   └── main.py              # FastAPI app entry point
│   ├── tests/
│   │   └── test_rag.py          # Unit tests for RAG pipeline
│   ├── .env                     # Environment variables (e.g., Pinecone API key)
│   ├── requirements.txt         # Python dependencies
│   └── Dockerfile               # Docker configuration for backend
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatWindow.jsx   # Chat UI component
│   │   │   └── LanguageToggle.jsx # Language switcher component
│   │   ├── assets/              # Static assets (e.g., images, fonts)
│   │   ├── App.jsx              # Main React app
│   │   ├── main.jsx             # Vite entry point
│   │   ├── index.css            # Tailwind CSS styles
│   │   └── services/
│   │       └── api.js           # API calls to backend
│   ├── public/                  # Static files (e.g., favicon)
│   ├── index.html               # Vite HTML template
│   ├── vite.config.js           # Vite configuration with Tailwind
│   ├── package.json             # Node dependencies
│   └── Dockerfile               # Docker configuration for frontend
├── docker-compose.yml           # Docker Compose for multi-container setup
└── README.md                    # Project documentation
```
#### Initialize Project

#### Create Root Directory:
```bash 
mkdir rag-tax-chat-app
cd rag-tax-chat-app
```

#### Backend Setup:
```bash 
mkdir backend\app\api backend\app\rag backend\app\knowledge_base\documents\amharic backend\app\knowledge_base\documents\english backend\app\utils backend\tests
echo. > backend\app\__init__.py
echo. > backend\app\api\__init__.py
echo. > backend\app\rag\__init__.py
echo. > backend\app\utils\__init__.py
echo. > backend\app\main.py
echo. > backend\app\api\routes.py
echo. > backend\app\api\models.py
echo. > backend\app\rag\pipeline.py
echo. > backend\app\rag\embeddings.py
echo. > backend\app\knowledge_base\preprocess.py
echo. > backend\tests\test_rag.py
echo. > backend\.env
echo. > backend\requirements.txt
echo. > backend\Dockerfile
```

#### Frontend Setup (React Vite):
```bash 
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install axios @tailwindcss/vite
mkdir src\components src\services src\assets
echo. > src\components\ChatWindow.jsx
echo. > src\components\LanguageToggle.jsx
echo. > src\services\api.js
cd ..
```

#### Docker and Root Files:
```bash 
echo. > docker-compose.yml
echo. > README.md
```


### Populate Key Files

#### backend/requirements.txt:
```bash
fastapi==0.115.0
uvicorn==0.30.6
transformers==4.44.2
torch==2.4.1
sentence-transformers==3.1.1
langdetect==1.0.9
faiss-cpu==1.8.0
pinecone-client==5.0.1
pymongo==4.8.0
python-dotenv==1.0.1
```

```bash backend/.env (Example):
PINECONE_API_KEY=your-pinecone-api-key
MONGODB_URI=mongodb://localhost:27017/rag_tax_chat
```

```bash frontend/vite.config.js (As provided):
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
})

```
