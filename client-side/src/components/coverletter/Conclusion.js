
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Conclusion.css';

const Conclusion = () => {
  const [conclusionText, setConclusionText] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const suggestions = [
    "Thank you for considering my application. I am excited about the opportunity to bring my unique skills and experiences to your team.",
    "I look forward to the possibility of contributing to your company's success and am eager to discuss how my background aligns with your needs.",
    "I am enthusiastic about the opportunity to join [Company Name] and am confident in my ability to make a meaningful impact."
  ];

  const handleSuggestionClick = (text) => {
    setConclusionText(text);
  };

  const handleClear = () => {
    setConclusionText('');
  };

  const createPost = async () => {
    try {
      const response = await fetch('http://localhost:5000/conclusion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ conclusion: conclusionText })
      });

      if (response.ok) {
        alert("Conclusion saved successfully!");
        setConclusionText('');
      } else {
        console.error("Failed to save conclusion");
        alert("There was an error saving your conclusion.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error saving your conclusion.");
    }
  };

  
  const handleNext = () => {
   
    navigate('/tempmanager'); // Change this to your actual next route
  };

  return (
    <div className="conclusion-container">
      <div className="conclusion-suggestions">
        <h3>Conclusion Suggestions</h3>
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li 
              key={index} 
              onClick={() => handleSuggestionClick(suggestion)} 
              className="suggestion-item"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      </div>

      <div className="conclusion-editor">
        <h2>Conclusion</h2>
        <textarea
          value={conclusionText}
          onChange={(e) => setConclusionText(e.target.value)}
          placeholder="Write your conclusion here..."
          rows="5"
          className='textarea-conclusion'
        />
        <div className="button-container">
          <button onClick={handleClear} className="clear-button">Clear</button>
          <button onClick={createPost} className="save-button-Con">Save</button>
          <button onClick={handleNext} className="next-button">Next</button> {/* Next Button */}
        </div>
      </div>
    </div>
  );
};

export default Conclusion;
