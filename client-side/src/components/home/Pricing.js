import React from "react";
import "./Pricing.css";

const Pricing = () => {
  return (
    <div className="pricing-container">
      <header className="header">
        <h1>Simple Pricing with One Goal</h1>
        <p>To get you hired.</p>
      </header>
      <section className="pricing-section">
        <div className="card basic">
          <h2>FREE</h2>
          <h3>Basic Package</h3>
          <p>Start building your resume today for free.</p>
          <ul>
            <li>Resume Builder</li>
            <li>Resume Templates</li>
            <li>Cover Letter Builder</li>
            <li>Cover Letter Templates</li>
            <li>Download in TXT Format</li>
            <li>Unlimited Downloads, Prints, and Edits</li>
            <li>Resume Check</li>
            <li>Instant Job Matches</li>
          </ul>
          <button-btn1>Get Started</button-btn1>
        </div>

        <div className="card pro">
          <h2>MOST POPULAR</h2>
          <h3>Pro Package</h3>
          <p>With a 14-day trial for: ₹195.00</p>
          <p>Auto-renews at ₹395.00 every 4 weeks. Cancel anytime.</p>
          <ul>
            <li>All Basic Features</li>
            <li>Download in Multiple Formats</li>
            <li>Bold.Pro</li>
            <li>Big Interview</li>
          </ul>
          <button-btn1>Start Trial</button-btn1>
        </div>

        <div className="card annual">
          <h2>BEST VALUE</h2>
          <h3>Annual Package</h3>
          <p>₹99.58/month (₹1,195 billed annually)</p>
          <p>Save 77%. Cancel anytime.</p>
          <ul>
            <li>All Pro Features</li>
            <li>Annual Payment Savings</li>
          </ul>
          <button-btn1>Subscribe Now</button-btn1>
        </div>
      </section>
      <section>
        <h2>What's Included in Your Plan</h2>

        <div className="pricing-section">
          {/* <h2>What's Included in Your Plan</h2> */}
          <div className="pricing-cards">
            <br></br>
            {/* Basic Package */}
            <div className="pricing-card basic">
              <h3>Basic Package</h3>
              <p className="price">FREE</p>
              <p>Start for free. When you’re ready, we have more.</p>
              <ul>
                <li>Access to resume builder</li>
                <li>TXT format download</li>
                <li>Unlimited edits</li>
              </ul>
            </div>

            {/* Pro Package */}
            <div className="pricing-card pro">
              <h3>Pro Package</h3>
              <p className="price">₹195.00</p>
              <p>14-day trial. Auto-renews at ₹395.00 every 4 weeks.</p>
              <ul>
                <li>18+ resume templates</li>
                <li>Multiple formats: PDF, Word, TXT</li>
                <li>Cover Letter Builder</li>
              </ul>
            </div>

            {/* Annual Package */}
            <div className="pricing-card annual">
              <h3>Annual Package</h3>
              <p className="price">₹99.58/month</p>
              <p>Pay ₹1,195.00 upfront. Save 77%. Auto-renews annually.</p>
              <ul>
                <li>Full access to resume and cover letter tools</li>
                <li>Instant job matches</li>
                <li>Professional networking site access</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
