
// src/components/Upload.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Upload.css';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setUploadStatus('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(' http://localhost:5000/upload' , formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setUploadStatus('Upload successful!');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Upload failed. Please try again.');
    }
  };

  const handleResetFile = () => {
    setSelectedFile(null);
    setUploadStatus('');
    document.getElementById('fileInput').value = '';
  };

  const handleNewCoverLetter = () => {
    navigate('/cover-letter');
  };

  return (
    <div className='upload-main-container'>
      <div className="container-left">
        <h1>Upload Your Resume</h1>
        <div className='upload-resume-container'>
          <input
            type="file"
            id="fileInput"
            accept=".pdf, .doc, .docx"
            onChange={handleFileChange}
            className="file-input"
          />
          <label htmlFor="fileInput" className="file-input-label">
            Select File
          </label>
          <button onClick={handleResetFile} className='upload-change-btn'>
            Change File
          </button>
        </div>

        {uploadStatus && <p className="status-message">{uploadStatus}</p>}

        <button onClick={handleUpload} className="upload-button">
          Continue
        </button>
      </div>

      <div className="container-right">
        <h1>Create from Template</h1>
        <button onClick={handleNewCoverLetter} className='new-cover-letter-btn'>
          New Cover Letter
        </button>
      </div>
    </div>
  );
};

export default Upload;
