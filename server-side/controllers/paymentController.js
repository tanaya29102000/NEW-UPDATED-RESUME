
// paymentController.js
const Payment = require('../models/paymentModel');
const nodemailer = require('nodemailer');

// POST: Save Payment Data
const savePaymentData = async (req, res) => {
  try {
    const { cardNumber, cardHolder, expiry, cvv } = req.body;

    // Save payment details to database
    const payment = new Payment({
      cardNumber,
      cardHolder,
      expiry,
      cvv,
      plan: 'Premium Membership',
      amount: 49.99,
    });

    await payment.save();

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'Pranavjii123@gmail.com',
        pass: 'Pranav&123',
      },
    });

    const mailOptions = {
      from: 'Pranavjii123@gmail.com',
      to: email,
      subject: 'Payment Successful',
      text: `Your payment for ${payment.plan} was successful!`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Payment successful and saved to the database' });
  } catch (error) {
    res.status(500).json({ message: 'Error processing payment', error: error.message });
  }
};

// GET: Retrieve All Payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving payments', error: error.message });
  }
};

module.exports = { savePaymentData, getAllPayments };
