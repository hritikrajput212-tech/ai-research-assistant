# 🤖 AI Research Assistant (RAG-Based PDF Chatbot)

An AI-powered Research Assistant that allows users to upload PDF documents and ask natural language questions about their content. The application uses Retrieval-Augmented Generation (RAG) with vector search to provide context-aware answers.

---

## 🚀 Features

- 📄 Upload PDF documents
- 🔍 Extract text using PyPDF
- ✂️ Automatic text chunking
- 🧠 Semantic search using vector embeddings
- 💾 ChromaDB vector database
- 🤖 Gemini 2.5 Flash powered responses
- 💬 Interactive chat interface
- 🌙 Dark mode support
- ⚡ FastAPI backend
- ⚛️ React frontend

---

## 🏗️ Architecture

```
                React Frontend
                      │
                  Axios API
                      │
               FastAPI Backend
                      │
                PDF Processing
                  (PyPDF)
                      │
               Text Chunking
                      │
          HuggingFace Embeddings
                      │
             Chroma Vector Database
                      │
          Similarity Search (RAG)
                      │
             Gemini 2.5 Flash LLM
                      │
                 Final Answer
```

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Axios
- CSS

### Backend
- FastAPI
- Python

### AI / RAG
- LangChain
- ChromaDB
- HuggingFace Embeddings
- Gemini 2.5 Flash
- PyPDF

---

## 📂 Project Structure

```
ai-research-assistant/
│
├── backend/
│   ├── app.py
│   ├── rag.py
│   ├── config.py
│   ├── requirements.txt
│   ├── uploads/
│   └── chroma_db/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Gangeshh21/ai-research-assistant.git

cd ai-research-assistant
```

---

### Backend Setup

```bash
cd backend

python -m venv venv

source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Create a `.env` file

```env
GOOGLE_API_KEY=YOUR_API_KEY
```

Run backend

```bash
python -m uvicorn app:app --reload
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## 💬 Usage

1. Upload a PDF document.
2. Wait for indexing.
3. Ask questions related to the uploaded PDF.
4. Receive AI-generated answers using RAG.

---

## 📌 Future Improvements

- Multiple PDF support
- Source citations
- Chat history
- User authentication
- Docker support
- Cloud deployment
- Conversation memory

---



## ⭐ If you like this project

Please consider giving it a **Star ⭐**.
