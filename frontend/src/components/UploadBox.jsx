function UploadBox({
  file,
  setFile,
  uploadPDF,
  uploadMessage
}) {

return (

<div className="upload-box">

<h2>📄 Upload PDF</h2>


<input
type="file"
accept=".pdf"
onChange={(e)=>setFile(e.target.files[0])}
/>


<button onClick={uploadPDF}>
Upload
</button>


<p>{uploadMessage}</p>


{
file && (
<p>
Selected: <b>{file.name}</b>
</p>
)
}


</div>

)

}

export default UploadBox;