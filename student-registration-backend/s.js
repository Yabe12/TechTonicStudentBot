const axios = require('axios');

const token = '7970158260:AAEVS2QEkTqC3uOm9V2U6GoyCgNI9loVlB4'; // Replace with your bot token
const allowedUserIds = [ 5569686407, 7192871178]; // Replace with the Telegram user IDs of your admins

async function notifyAdmins(message) {
    for (const userId of allowedUserIds) {
        try {
            await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
                chat_id: userId,
                text: message,
            });
            console.log(`Message sent to admin ${userId}`);
        } catch (error) {
            console.error(`Error sending message to admin ${userId}:`, error.response.data);
        }
    }
}

// Example usage
notifyAdmins("Important update: Something has happened!");
