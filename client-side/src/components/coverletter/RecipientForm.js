
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './RecipientForm.css'; // Ensure you create this CSS file for styling

const RecipientForm = () => {
  const [recipientData, setRecipientData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: ''
  });

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipientData({ ...recipientData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/recipient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipientData),
      });
      
      if (response.ok) {
        const result = await response.json();
        alert('Recipient Information Submitted Successfully:');
        console.log('Recipient Information Submitted Successfully:', result);
        // Optionally, clear the form or display a success message here
      } else {
        console.error('Error submitting form:', response.statusText);
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

  const handleNext = () => {
    navigate('/subject'); // Replace '/subject' with the correct path for your subject page
  };

  return (
    <div className="recipient-form-container">
      <h2>Recipient Information</h2>
      <p className='rp'>Enter your recipient's information</p>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="e.g. John"
              value={recipientData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="e.g. Smith"
              value={recipientData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              placeholder="e.g. ACME Technologies"
              value={recipientData.companyName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              placeholder="e.g. San Francisco"
              value={recipientData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>State/Province</label>
            <input
              type="text"
              name="state"
              placeholder="e.g. California or CA"
              value={recipientData.state}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Zip</label>
            <input
              type="text"
              name="zip"
              placeholder="e.g. 94102"
              value={recipientData.zip}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="e.g. +415-555-5555"
              value={recipientData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="e.g. johnsmith@gmail.com"
              value={recipientData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-buttons">
          <button type="button" className="cancel-button" onClick={() => setRecipientData({})}>Clear</button>
          <button type="submit" className="save-button-Rec">Save</button>
          <button type="button" className="next-button" onClick={handleNext}>Next</button>
        </div>
      </form>
    </div>
  );
};

export default RecipientForm;
