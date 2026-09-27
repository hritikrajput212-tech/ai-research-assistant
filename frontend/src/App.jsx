import { useState, useEffect } from "react";
import axios from "axios";

import Header from "./components/Header";
import UploadBox from "./components/UploadBox";
import ChatBox from "./components/ChatBox";
import InputBox from "./components/InputBox";

import "./App.css";


function App() {

  // Single PDF
  const [file, setFile] = useState(null);

  const [uploadMessage, setUploadMessage] = useState("");


  // Chat
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);



  // Dark Mode
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });



  useEffect(() => {

    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } 
    else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

  }, [darkMode]);




  // Upload PDF
  const uploadPDF = async () => {

    if (!file) {
      alert("Please select a PDF");
      return;
    }


    const formData = new FormData();

    formData.append("file", file);



    try {

      const res = await axios.post(
        "http://127.0.0.1:8000/upload",
        formData,
        {
          headers:{
            "Content-Type":"multipart/form-data"
          }
        }
      );


      setUploadMessage(
        `✅ ${res.data.message}`
      );


    } catch(err){

      console.error(err);
      alert("Upload failed");

    }

  };





  // Ask Question
  const askQuestion = async () => {

    if (!question.trim() || loading)
      return;


    const userQuestion = question;



    setMessages((prev)=>[
      ...prev,
      {
        sender:"user",
        text:userQuestion
      }
    ]);


    setQuestion("");

    setLoading(true);



    try {

      const res = await axios.post(
        "http://127.0.0.1:8000/ask",
        {
          question:userQuestion
        }
      );



      setMessages((prev)=>[
        ...prev,
        {
          sender:"ai",
          text:res.data.answer
        }
      ]);



    } catch(err){

      console.error(err);


      setMessages((prev)=>[
        ...prev,
        {
          sender:"ai",
          text:"Something went wrong."
        }
      ]);

    }



    setLoading(false);

  };






  return (

    <div className="container">


      <div className="top-bar">

        <Header />


        <button
          className="theme-btn"
          onClick={()=>setDarkMode(!darkMode)}
        >

          {
            darkMode
            ? "☀️ Light Mode"
            : "🌙 Dark Mode"
          }

        </button>


      </div>




      <UploadBox

        file={file}

        setFile={setFile}

        uploadPDF={uploadPDF}

        uploadMessage={uploadMessage}

      />





      <ChatBox

        messages={messages}

        loading={loading}

      />





      <InputBox

        question={question}

        setQuestion={setQuestion}

        askQuestion={askQuestion}

        loading={loading}

      />



    </div>

  );

}


export default App;