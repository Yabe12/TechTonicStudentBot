const axios = require('axios');

async function sendMessageToChannel() {
  const token = '7970158260:AAEVS2QEkTqC3uOm9V2U6GoyCgNI9loVlB4'; // Replace with your bot token
  const chatId = '5569686407'; // Use the channel username
 
  const message = 'Hello, this is a test message!';

  try {
    const response = await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatId,
      text: message,
    });
    console.log('Message sent:', response.data);
  } catch (error) {
    console.error('Error sending message:', error.response.data);
  }
}

sendMessageToChannel();
