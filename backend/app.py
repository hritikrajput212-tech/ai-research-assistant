from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
import shutil
import os
from pypdf import PdfReader

from rag import split_text, store_chunks, ask_question
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QuestionRequest(BaseModel):
    question: str


UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)



@app.get("/")
def home():
    return {
        "message": "AI Research Assistant Backend is Running!"
    }



# Single PDF Upload
@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    # Check PDF
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a PDF file."
        )


    # Save PDF
    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )


    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )


    # Extract text
    reader = PdfReader(file_path)

    text = ""


    for page in reader.pages:

        extracted_text = page.extract_text()

        if extracted_text:
            text += extracted_text + "\n"



    # Split text
    chunks = split_text(text)



    # Store embeddings
    stored = store_chunks(chunks)



    print(f"\nTotal Chunks: {len(chunks)}")


    for i, chunk in enumerate(chunks):

        print(f"\n========== Chunk {i+1} ==========")
        print(chunk[:300])



    return {

        "message": "PDF uploaded successfully",
        "filename": file.filename,
        "characters": len(text),
        "chunks": len(chunks),
        "stored_chunks": stored

    }




# Ask Question
@app.post("/ask")
async def ask(request: QuestionRequest):

    answer = ask_question(request.question)


    return {

        "question": request.question,
        "answer": answer

    }