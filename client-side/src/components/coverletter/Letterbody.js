
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Letterbody.css';

const Letterbody = () => {
  const navigate = useNavigate();
  const [letterBodyText, setLetterBodyText] = useState('');
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

 
  const suggestions = [
    "I bring strong leadership aspirations and key strengths in [Strength 1], [Strength 2] and [Strength 3]. Focused on continued growth and progress,I am skilled in improving operations and processes while inspiring teams to deliver superior performance.  Being familiar with the requirements of this role, I see that you're seeking skills in [Job Skill 1], [Job Skill 2], and [Job Skill 3]. I am eager to offer an entrepreneurial mindset to build creative solutions with [Target Company]. I've researched and learned a great deal about your mission-driven successes and the privilege of working with your team would be exceptionally gratifying.",
    "Throughout my academic journey, I have consistently strived for excellence, maintaining a strong academic record and actively participating in various extracurricular activities. These experiences have helped me develop outstanding organizational skills, exceptional attention to detail, and a strong ability to multitask effectively. Moreover, my passion for learning and my entrepreneurial mindset have shaped my commitment to making a positive impact in any role I undertake.In addition to my academic pursuits, I have actively taken part in community service initiatives, demonstrating my dedication to giving back and making a difference. This has allowed me to develop excellent interpersonal skills, such as effective communication, cooperation, and teamwork. I am confident my interpersonal skills, combined with my dedication and drive, would make me a valuable asset to any task or project your company undertakes.Please review my attached resume for more details on the following qualifications:•[Enter Job-related Skill or Accomplishment]•[Enter Job-related Skill or Accomplishment]•[Enter Job-related Skill or Accomplishment]•[Enter Job-related Skill or Accomplishment]",
  ];

  
  const handleSuggestionClick = (text, index) => {
    setLetterBodyText(text);
    setSelectedSuggestionIndex(index);
    setErrorMessage('');
  };


  const handleCancel = () => {
    setLetterBodyText('');
    setSelectedSuggestionIndex(null);
    setErrorMessage(''); 
  };

 
  const handleAdd = async () => {
    if (!letterBodyText.trim()) {
      setErrorMessage('Letter body text cannot be empty.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/letters', { // Replace with your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ letterBodyText }), 
      });

      if (response.ok) {
        const data = await response.json();
        alert("Letter body text added: " + data.message);
        setLetterBodyText(''); 
        setSelectedSuggestionIndex(null); 
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add letter body text');
      }
    } catch (error) {
      console.error('Error adding letter body text:', error);
      setErrorMessage(error.message); 
      setTimeout(() => setErrorMessage(''), 5000);  
    }
  };


  const handleNext = () => {
    console.log("Proceeding to the next step with:", letterBodyText);
    navigate('/closing-page'); 
  };

  return (
    <div className="letterbody-container">
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

      <div className="selected-letterbody">
        <h2>Letter Body</h2>
        <label htmlFor="letterBodyText">Letter Body Text</label>
        <textarea
          id="letterBodyText"
          value={letterBodyText}
          onChange={(e) => setLetterBodyText(e.target.value)}
          placeholder="Write your letter body text here..."
          rows="10"
          className='textarea-letter-body'
        />

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <div className="button-container">
          <button onClick={handleCancel} className="cancel-button">Clear</button>
          <button onClick={handleAdd} className="add-button" disabled={!letterBodyText}>
            Save
          </button>
          <button onClick={handleNext} className="next-button" disabled={!letterBodyText}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Letterbody;
