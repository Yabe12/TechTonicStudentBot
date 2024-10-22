// Load environment variables from .env file
require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Controller function to process form data and send it to Telegram
const submitStudentForm = async (req, res) => {
  try {
    const studentData = req.body;

    // Convert student data to JSON string
    const studentJson = JSON.stringify(studentData, null, 2);

    // Prepare the message to send to Telegram
    const messageText = `New Student Registration:\n${studentJson}`;

    // Send message to Telegram channel with inline keyboard buttons
    const response = await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: process.env.TELEGRAM_CHANNEL_ID,
      text: messageText,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Approve",
              callback_data: "approve", // Can handle this in your webhook
            },
            {
              text: "Disapprove",
              callback_data: "disapprove", // Can handle this in your webhook
            },
          ],
        ],
      },
    });

    // Handle file uploads
    if (req.files && req.files.cv) {
      const cvFile = req.files.cv; // Assuming 'cv' is the name of the file input in your form

      // Save the file to your server
      const cvPath = path.join(__dirname, 'uploads', cvFile.name); // Ensure uploads directory exists
      await cvFile.mv(cvPath); // Move file to your desired location

      // Send the file to Telegram (optional, based on your requirement)
      await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendDocument`, {
        chat_id: process.env.TELEGRAM_CHANNEL_ID,
        document: fs.createReadStream(cvPath), // Stream the file to Telegram
      });
    }

    // Return success response
    res.status(200).json({ message: 'Form submitted and sent to Telegram!' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Error submitting form' });
  }
};

module.exports = { submitStudentForm };
