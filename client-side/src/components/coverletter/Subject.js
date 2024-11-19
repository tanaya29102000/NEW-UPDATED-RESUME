
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Subject.css';

const Subject = ({ onBack }) => {
  const [subjectName, setSubjectName] = useState('');
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleSubjectChange = (e) => setSubjectName(e.target.value);
  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const subjectData = { subjectName, title };

    try {
      const response = await fetch('http://localhost:5000/subjects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subjectData),
      });

      if (response.ok) {
        alert('Subject information submitted successfully');
      } else {
        alert('Failed to submit subject information');
      }
    } catch (error) {
      console.error('Error submitting subject information:', error);
      alert('Error submitting subject information');
    }
  };

  const handleNext = () => {
    navigate('/opening-page');
  };

  const handleClear = () => {
    setSubjectName('');
    setTitle('');
  };

  return (
    <div className="subject-container">
      <h2>Enter Subject Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="subjectName">Subject Name</label>
          <input
            type="text"
            id="subjectName"
            name="subjectName"
            value={subjectName}
            onChange={handleSubjectChange}
            placeholder="e.g., Mathematics"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <select
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
            required
          >
            <option value="">Select Title</option>
            <option value="Ms.">Ms.</option>
            <option value="Mr.">Mr.</option>
            <option value="Dr.">Dr.</option>
            <option value="Prof.">Prof.</option>
          </select>
        </div>

        <div className="form-buttons">
          <button type="button" onClick={handleClear} className="back-button">Clear</button>
          <button type="submit" className="submit-button">Submit</button>
          <button type="button" onClick={handleNext} className="next-button">Next</button>
        </div>
      </form>
    </div>
  );
};

export default Subject;
