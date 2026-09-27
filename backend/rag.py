from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.embeddings import HuggingFaceEmbeddings

from langchain_chroma import Chroma
from langchain_text_splitters import RecursiveCharacterTextSplitter

from config import GOOGLE_API_KEY


# -----------------------------
# Embedding Model
# -----------------------------

embeddings = HuggingFaceEmbeddings(
    model_name="all-MiniLM-L6-v2"

)



# -----------------------------
# Chroma Vector Database
# -----------------------------

vector_store = Chroma(
    collection_name="research_docs",
    embedding_function=embeddings,
    persist_directory="chroma_db"
)



# -----------------------------
# Text Chunking
# -----------------------------

def split_text(text):

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )

    return splitter.split_text(text)



# -----------------------------
# Store PDF Chunks
# -----------------------------

def store_chunks(chunks):

    vector_store.add_texts(chunks)

    return len(chunks)



# -----------------------------
# Gemini LLM
# -----------------------------

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    google_api_key=GOOGLE_API_KEY
)



# -----------------------------
# Search Relevant Chunks
# -----------------------------

def search_chunks(question):

    results = vector_store.similarity_search(
        question,
        k=3
    )

    return results



# -----------------------------
# Ask Question
# -----------------------------

def ask_question(question):

    docs = search_chunks(question)


    context = "\n\n".join(
        doc.page_content
        for doc in docs
    )


    prompt = f"""
You are an AI Research Assistant.

Answer the question using only the provided context.

Context:
{context}


Question:
{question}

"""


    response = llm.invoke(prompt)


    return response.content