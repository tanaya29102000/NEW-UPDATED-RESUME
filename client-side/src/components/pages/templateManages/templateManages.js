
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate replaces useHistory in React Router v6
import './TemplateManager.css';

const TemplateManager = () => {
  const [selectedColor, setSelectedColor] = useState('#000'); // Default color
  const navigate = useNavigate(); // useNavigate hook for navigation

  // Array of colors to pick from
  const colors = ['#000', '#4facfe', '#00f2fe', '#ccc', '#888', '#ff6347', '#ffa500', '#8a2be2'];

  // Handle template click
  const handleTemplateClick = (templateId) => {
    // Navigate to the template detail page based on the clicked template ID
    navigate(`/template/${templateId}`);
  };

  return (
    <div className="template-manager-container">
      {/* Sidebar for Color Selection */}
      <div className="sidebar">
        <h3>Choose Color</h3>
        <div className="color-options">
          {colors.map((color) => (
            <div
              key={color}
              onClick={() => setSelectedColor(color)}
              className="color-circle"
              style={{
                backgroundColor: color,
                border: selectedColor === color ? '3px solid black' : '1px solid #ddd',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content Area with Templates */}
      <div className="templates">
        {[1, 2, 3].map((template) => (
          <div
            key={template}
            className="template"
            style={{
              borderColor: selectedColor,
              cursor: 'pointer',
            }}
            onClick={() => handleTemplateClick(template)} // Redirect on click
          >
            <h3 style={{ color: selectedColor }}>Cover Letter Template {template}</h3>
           
            <p className="template-content">
                </p>
            <p className="signature" style={{ color: selectedColor }}>
              Sincerely,<br />
              John Doe
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TemplateManager;
