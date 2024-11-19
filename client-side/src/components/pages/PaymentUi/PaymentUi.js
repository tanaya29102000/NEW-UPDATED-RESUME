
import React, { useState } from 'react';
import './PaymentUi.css';
import axios from 'axios';

const PaymentUi = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const paymentData = {
      cardNumber,
      cardHolder,
      expiry,
      cvv,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/payments', paymentData);
      alert(response.data.message);
    } catch (error) {
      alert('Error saving payment: ' + error.message);
    }
  };

  return (
    <div className="payment-main-container">
      <h2>Enter ATM Card Details</h2>
      <h3>Pricing Plan:</h3>
      <div className="pricing-plan">
        <p><strong>Plan:</strong> Premium Membership</p>
        <p><strong>Amount:</strong> $49.99 / month</p>
        <p><strong>Benefits:</strong> Unlimited access to exclusive content, priority support, and more!</p>
      </div>

      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="card-number">Card Number</label>
          <input
            type="text"
            id="card-number"
            placeholder="xxxx xxxx xxxx xxxx"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            maxLength={19}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="card-holder">Card Holder Name</label>
          <input
            type="text"
            id="card-holder"
            placeholder="John Doe"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            required
          />
        </div>

        <div className="input-row">
          <div className="input-group">
            <label htmlFor="expiry">Expiry Date</label>
            <input
              type="text"
              id="expiry"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              maxLength={5}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="password"
              id="cvv"
              placeholder="xxx"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              maxLength={3}
              required
            />
          </div>
        </div>

        <button type="submit" className="pay-button">Pay Now</button>
      </form>
    </div>
  );
};

export default PaymentUi;
