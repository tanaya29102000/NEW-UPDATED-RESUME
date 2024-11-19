
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './ContactForm.css';

const ContactForm = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    profession: '',
    city: 'Mumbai',
    state: '',
   
    phone: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(' http://localhost:5000/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const result = await response.json();
        alert('Writer information submitted successfully');
        
      } else {
        console.error('Error submitting form:', response.statusText);
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

  const handleNext = () => {
   
    navigate('/recipient-form'); 
  };

  return (
    <div className="contact-form-container">
      <h2>Name And Contact</h2>
      <p>Enter your contact information</p>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="e.g. John"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="e.g. Smith"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Profession</label>
            <input
              type="text"
              name="profession"
              placeholder="e.g. Developer"
              value={formData.profession}
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
              placeholder="e.g. Mumbai"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>State/Province</label>
            <input
              type="text"
              name="state"
              placeholder="e.g. California or CA"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="e.g. +415-555-5555"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="e.g. johnsmith@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-buttons">
          <button type="button" className="cancel-button">Clear</button>
          <button type="submit" className="save-button-contact">Save</button>
          <button type="button" className="next-button" onClick={handleNext}>Next</button> 
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
