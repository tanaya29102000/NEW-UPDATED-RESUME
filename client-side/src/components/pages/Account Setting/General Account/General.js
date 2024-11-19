
import React, { useState, useEffect } from "react";
import Slidenavbar from "../Sildenavbar/Sildenavbar";
import "./General.css";

// Function to generate a 4-digit numeric ID
const generateNumericId = () => {
  let id = '';
  for (let i = 0; i < 4; i++) {
    id += Math.floor(Math.random() * 10); // Generates a number between 0-9
  }
  return id;
};

const General = () => {
  const [accountId, setAccountId] = useState(''); // State to store the account ID
  const [fetchedAccountId, setFetchedAccountId] = useState(''); // State to store the fetched account ID

  useEffect(() => {
    // Function to fetch the account ID from the backend
    const fetchAccountId = async () => {
      try {
        const response = await fetch("http://your-backend-url/api/account"); // Adjust endpoint as needed
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Check if account ID exists
        if (data.accountId) {
          setFetchedAccountId(data.accountId); // Set the fetched account ID in state
        } else {
          const newId = generateNumericId(); // Generate a new ID if none exists
          setAccountId(newId); // Set the generated ID in state
          await sendAccountIdToBackend(newId); // Send the new ID to the backend
        }
      } catch (error) {
        console.error("Error fetching account ID:", error);
      }
    };

   
    const sendAccountIdToBackend = async (id) => {
      try {
        const response = await fetch("http://your-backend-url/api/account", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ accountId: id }), 
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Response from backend:", await response.json());
      } catch (error) {
        console.error("Error sending account ID to backend:", error);
      }
    };

    fetchAccountId(); 
  }, []);

  return (
    <div className="General-main-container">
      <Slidenavbar />

      <div className="general-account-setting-container">
        <h1 className="general-account-header">General Account Settings</h1>

        <div className="general-title">
          <p><strong>Generated Account ID:</strong> {accountId || fetchedAccountId} <span></span></p>
          <p><strong>Email ID:</strong> example@example.com{} <span><button >edit</button></span></p> 
          <p><strong>Password:</strong> ********* {} <span><button>edit</button></span></p>
          <p><strong>Contact Info:</strong> +1 234 567 890 {} <span> <button>edit</button></span></p>
        </div>
      </div>
    </div>
  );
};

export default General;
