
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import './Opening.css';

const Opening = () => {
  const navigate = useNavigate(); // Initialize navigate here
  const [openingText, setOpeningText] = useState('');
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(null);

  // Predefined suggestions
  const suggestions = [
    "As a focused and driven student, I believe I can fulfill the [Target Job Title] role and support the [Target Company]'s goals. My history of academic success and collaborative contributions illustrate a high level of dedication. I believe your organizational mission and my career path are well-aligned for a successful future.",
    "I'm confident that I am the employee you are seeking because I have all of the qualifications outlined in your job posting.",
    "My attached resume shows the highlights from my years of professional experience.",
    "My passion for this field, combined with my respect for your company, make me eager to get on board.",
    "I honestly believe that this job is what I was meant to do. It's the perfect match for my skills, experience and interests."
  ];

  // Handle suggestion click
  const handleSuggestionClick = (text, index) => {
    setOpeningText(text);
    setSelectedSuggestionIndex(index);
  };

  // Cancel and reset the input
  const handleCancel = () => {
    setOpeningText('');
    setSelectedSuggestionIndex(null);
  };

  // Add opening text via POST request
  const handleAdd = async () => {
    try {
      const response = await fetch('http://localhost:5000/opening-text', { // Replace with your API endpoint
        method: 'POST',
  headers: {
    'Content-Type': 'application/json', // Make sure this header is present
  },
  body: JSON.stringify({ openingText }),  // Send the opening text
      });

      if (response.ok) {
        const data = await response.json();
        alert("Opening text added: " + data.message); // Assuming your backend sends back a message
        setOpeningText(''); // Clear textarea after adding
        setSelectedSuggestionIndex(null); // Reset selected suggestion
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('Error adding opening text:', error);
      alert("Failed to add opening text."); // Notify the user
    }
  };

  // Move to the next step
  const handleNext = () => {
    console.log("Proceeding to the next step with:", openingText);
    navigate('/letterbody-page'); // Use navigate instead of history.push
  };

  return (
    <div className="opening-container">
      <div className="suggestions-container">
        <h3>Ready-to-use suggestions</h3>
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li 
              key={index} 
              onClick={() => handleSuggestionClick(suggestion, index)} 
              className={`suggestion-item ${selectedSuggestionIndex === index ? 'selected' : ''}`}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      </div>

      <div className="selected-opening">
        <h2>Opening</h2>
        <label htmlFor="openingText">Opening text</label>
        <textarea
          id="openingText"
          value={openingText}
          onChange={(e) => setOpeningText(e.target.value)}
          placeholder="Write your opening text here..."
          rows="8"
          className='textaraea-opening'
        />
        
        <div className="button-container">
          <button onClick={handleCancel} className="cancel-button">Clear</button>
          <button onClick={handleAdd} className="add-button" disabled={!openingText}>Save</button>
          <button onClick={handleNext} className="next-button">Next</button>
        </div>
      </div>
    </div>
  );
}

export default Opening;
