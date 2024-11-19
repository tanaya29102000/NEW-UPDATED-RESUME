
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js'; // Import html2pdf
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import './CoverletterTemp3.css';

const Coverlettertemp3 = () => {
  const [contacts, setContacts] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [openingTexts, setOpeningTexts] = useState([]);
  const [letterBody, setLetterBody] = useState('');
  const [conclusion, setConclusion] = useState('');

  const [loadingState, setLoadingState] = useState({
    contacts: true,
    recipients: true,
    subjects: true,
    openingTexts: true,
    letterBody: true,
    conclusion: true,
  });

  const [errorState, setErrorState] = useState({
    contacts: null,
    recipients: null,
    subjects: null,
    openingTexts: null,
    letterBody: null,
    conclusion: null,
    global: null,
  });

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contactsRes, recipientsRes, subjectsRes, openingTextsRes, letterBodyRes, conclusionRes] = await Promise.all([
          axios.get('http://localhost:5000/contacts'),
          axios.get('http://localhost:5000/recipient'),
          axios.get('http://localhost:5000/subjects'),
          axios.get('http://localhost:5000/opening-text'),
          axios.get('http://localhost:5000/letters'),
          axios.get('http://localhost:5000/conclusion'),
        ]);

        setContacts(contactsRes.data);
        setRecipients(recipientsRes.data);
        setSubjects(subjectsRes.data);
        setOpeningTexts(openingTextsRes.data);
        setLetterBody(letterBodyRes.data[0]?.letterBodyText || '');
        setConclusion(conclusionRes.data[0]?.conclusion || '');

        setLoadingState({
          contacts: false,
          recipients: false,
          subjects: false,
          openingTexts: false,
          letterBody: false,
          conclusion: false,
        });
      } catch (error) {
        setErrorState((prevState) => ({
          ...prevState,
          global: error.message || 'Error fetching all data',
        }));
        setLoadingState({
          contacts: false,
          recipients: false,
          subjects: false,
          openingTexts: false,
          letterBody: false,
          conclusion: false,
        });
      }
    };

    fetchData();
  }, []);

  const renderSection = (loading, error, data, emptyMessage, renderContent) => {
    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (data.length === 0) return <p>{emptyMessage}</p>;
    return renderContent();
  };

  const downloadPDF = async () => {
    const element = document.getElementById("cover-letter-content");

    const options = {
      margin: 10,
      filename: 'cover_letter.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 4 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    // Generate PDF
    html2pdf().from(element).set(options).save();

    // After downloading the PDF, delete data using multiple API calls
    try {
      await Promise.all([
        axios.delete('http://localhost:5000/contacts'),
        axios.delete('http://localhost:5000/recipient'),
        axios.delete('http://localhost:5000/subjects'),
        axios.delete('http://localhost:5000/opening-text'),
        axios.delete('http://localhost:5000/letters'),
        axios.delete('http://localhost:5000/conclusion')
      ]);
      console.log('Data deleted successfully.');
      
      // Redirect to a new page (for example, a "Success" or "Home" page)
      navigate('/'); // Modify this route as needed
    } catch (error) {
      console.error('Error deleting data:', error.message);
    }
  };

  return (
    <div className="cover-letter-container-temp3">
      <div id="cover-letter-content" className="coverlettermain-container-flex-temp3">
        {/* Contacts Section */}
        <div className="contacts-section-temp3">
          {renderSection(
            loadingState.contacts,
            errorState.contacts,
            contacts,
            'No contacts available',
            () => (
              <ul>
                {contacts.map((contact) => (
                  <li key={contact._id || contact.phone}>
                    <h1 style={{ padding: '8px auto', color: 'blue' }}>
                      {contact.firstName} {contact.lastName}
                    </h1>
                    <div className="contact-details-temp3">
                      <strong>Phone:</strong> {contact.phone} <br />
                      <strong>Email:</strong> {contact.email} <br />
                      <strong>Address:</strong> {contact.city}, {contact.state}
                    </div>
                  </li>
                ))}
              </ul>
            )
          )}
        </div>

        <div className="other-sections-temp3">
          {/* Subjects Section */}
          <div className="subjects-section-temp3">
            {renderSection(
              loadingState.subjects,
              errorState.subjects,
              subjects,
              'No subjects available',
              () => (
                <ul>
                  {subjects.map((subject) => (
                    <li key={subject._id || subject.subjectName}>
                      <p style={{ textAlign: 'justify', padding: '5px auto' }}>
                        <strong>Subject:</strong> {subject.subjectName}
                      </p>
                    </li>
                  ))}
                </ul>
              )
            )}
          </div>

          {/* Recipients Section */}
          <div className="recipients-section-temp3">
            {renderSection(
              loadingState.recipients,
              errorState.recipients,
              recipients,
              'No recipients available',
              () => (
                <ul>
                  {recipients.map((recipient) => (
                    <li key={recipient._id || recipient.firstName}>
                      <p style={{ textAlign: 'justify' }}>
                        <strong>Dear:</strong> {recipient.firstName} {recipient.lastName}
                      </p>
                    </li>
                  ))}
                </ul>
              )
            )}
          </div>

          {/* Opening Texts Section */}
          <div className="opening-texts-section-temp3">
            {renderSection(
              loadingState.openingTexts,
              errorState.openingTexts,
              openingTexts,
              'No opening texts available',
              () => (
                <ul>
                  {openingTexts.map((text) => (
                    <li key={text._id || text.openingText}>{text.openingText}</li>
                  ))}
                </ul>
              )
            )}
          </div>

          {/* Letter Body Section */}
          <div className="letter-body-section-temp3">
            {loadingState.letterBody ? (
              <div className="loading">Loading...</div>
            ) : errorState.letterBody ? (
              <div className="error">{errorState.letterBody}</div>
            ) : (
              <p style={{ textAlign: 'justify' }}>{letterBody}</p>
            )}
          </div>

          {/* Conclusion Section */}
          <div className="conclusion-section-temp3">
            {loadingState.conclusion ? (
              <div className="loading">Loading...</div>
            ) : errorState.conclusion ? (
              <div className="error">{errorState.conclusion}</div>
            ) : (
              <p>{conclusion}</p>
            )}
          </div>

          {/* Footer */}
          <div className="footer-section-temp3">
            <p>Sincerely,</p>
            {contacts.length > 0 && (
              <p>{contacts[0].firstName} {contacts[0].lastName}</p>
            )}
          </div>
        </div>
      </div>

      <button onClick={downloadPDF} className="download-button" style={{ marginTop: "24px", background:"#f573a7" }}>
        Download Cover Letter as PDF
      </button>
    </div>
  );
};

export default Coverlettertemp3;
