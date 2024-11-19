
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CoverletterTemp4.css';

const Coverlettertemp4 = () => {
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

  // Fetch all data concurrently
  const fetchData = async () => {
    try {
      const responses = await Promise.all([
        axios.get('http://localhost:5000/contacts'),
        axios.get('http://localhost:5000/recipient'),
        axios.get('http://localhost:5000/subjects'),
        axios.get('http://localhost:5000/opening-text'),
        axios.get('http://localhost:5000/letters'),
        axios.get('http://localhost:5000/conclusion'),
      ]);

      setContacts(responses[0].data);
      setRecipients(responses[1].data);
      setSubjects(responses[2].data);
      setOpeningTexts(responses[3].data);
      setLetterBody(responses[4].data[0].letterBodyText);
      setConclusion(responses[5].data[0].conclusion);

      setLoadingState({
        contacts: false,
        recipients: false,
        subjects: false,
        openingTexts: false,
        letterBody: false,
        conclusion: false,
      });
    } catch (error) {
      setErrorState({
        ...errorState,
        global: error.message || 'Error fetching all data',
      });
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

  useEffect(() => {
    fetchData();
  }, []);

  const renderSection = (loading, error, data, emptyMessage, renderContent) => {
    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (data.length === 0) return <p>{emptyMessage}</p>;
    return renderContent();
  };

  return (
    <div className="cover-letter-container-temp4">
      <div className="coverlettermain-container-flex-temp4">
        <div className="contacts-section-temp4">
          {renderSection(
            loadingState.contacts,
            errorState.contacts,
            contacts,
            'No contacts available',
            () => (
              <ul>
                {contacts.map((contact) => (
                  <li key={contact._id || contact.phone}>
                    <h1>{contact.firstName} {contact.lastName}</h1>
                    <div className="contact-details-temp4">
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

        <div className="other-sections-temp4">
          <div className="subjects-section-temp4">
            {renderSection(
              loadingState.subjects,
              errorState.subjects,
              subjects,
              'No subjects available',
              () => (
                <ul>
                  {subjects.map((subject) => (
                    <li key={subject._id || subject.subjectName}>
                      <p><strong>Subject:</strong> {subject.subjectName}</p>
                    </li>
                  ))}
                </ul>
              )
            )}
          </div>

          <div className="recipients-section-temp4">
            {renderSection(
              loadingState.recipients,
              errorState.recipients,
              recipients,
              'No recipients available',
              () => (
                <ul>
                  {recipients.map((recipient) => (
                    <li key={recipient._id || recipient.firstName}>
                      <p><strong>Dear:</strong> {recipient.firstName} {recipient.lastName}</p>
                    </li>
                  ))}
                </ul>
              )
            )}
          </div>

          <div className="opening-texts-section-temp4">
            {renderSection(
              loadingState.openingTexts,
              errorState.openingTexts,
              openingTexts,
              'No opening texts available',
              () => (
                <ul>
                  {openingTexts.map((text) => (
                    <li key={text._id || text.openingText}>
                      {text.openingText}
                    </li>
                  ))}
                </ul>
              )
            )}
          </div>

          <div className="letter-body-section-temp4">
            {loadingState.letterBody ? (
              <div className="loading">Loading...</div>
            ) : errorState.letterBody ? (
              <div className="error">{errorState.letterBody}</div>
            ) : (
              <p>{letterBody}</p>
            )}
          </div>

          <div className="conclusion-section-temp4">
            {loadingState.conclusion ? (
              <div className="loading">Loading...</div>
            ) : errorState.conclusion ? (
              <div className="error">{errorState.conclusion}</div>
            ) : (
              <p>{conclusion}</p>
            )}
          </div>

          <div className="sincerely-section-temp4">
            <h3>Sincerely,</h3>
            {contacts.length > 0 && (
              <p>{contacts[0].firstName} {contacts[0].lastName}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coverlettertemp4;
