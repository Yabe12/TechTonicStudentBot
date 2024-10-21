// Load environment variables from .env file
require('dotenv').config();
const axios = require('./node_modules/axios/index.d.cts');

// Controller function to process form data and send it to Telegram
const submitStudentForm = async (req, res) => {
  try {
    const studentData = req.body;

    // Convert student data to JSON string
    const studentJson = JSON.stringify(studentData, null, 2);

    // Send message to Telegram channel
    await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: process.env.TELEGRAM_CHANNEL_ID,
      text: `New Student Registration:\n${studentJson}`,
    });

    // Return success response
    res.status(200).json({ message: 'Form submitted and sent to Telegram!' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Error submitting form' });
  }
};

module.exports = { submitStudentForm };
