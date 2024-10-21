// admin.js
const TelegramBot = require('node-telegram-bot-api');
const QRCode = require('qrcode');
require('dotenv').config();

const token = process.env.STUDENT_BOT_TOKEN;
const bot = new TelegramBot(token);

const adminChannelId = process.env.ADMIN_CHANNEL_ID;

let pendingRegistrations = {}; // Ensure this matches with student.js

// Approve a student
function approveStudent(studentChatId) {
    const studentData = pendingRegistrations[studentChatId];
    if (studentData) {
        const idNumber = studentData.idNumber;

        // Generate QR code
        QRCode.toFile(`./qr_codes/${idNumber}.png`, `ID Number: ${idNumber}`, (err) => {
            if (err) {
                console.error('Error generating QR code:', err);
                return;
            }

            // Send approval message along with the QR code
            bot.sendMessage(studentChatId, "🎉🎊 Congratulations! 🎊🎉 You have been selected for the internship program. Here's your QR code for future reference.");
            bot.sendPhoto(studentChatId, `./qr_codes/${idNumber}.png`, { caption: 'Your QR Code' });
        });

        // Notify admin about the approval
        bot.sendMessage(adminChannelId, `✅ Student ${studentData.fullName} has been approved for the internship.`);
        delete pendingRegistrations[studentChatId];
    } else {
        bot.sendMessage(adminChannelId, `❌ Student with ID ${studentChatId} not found in pending registrations.`);
    }
}

// Reject a student
function rejectStudent(studentChatId) {
    const studentData = pendingRegistrations[studentChatId];
    if (studentData) {
        bot.sendMessage(studentChatId, "We're sorry, but you have not been selected for the internship at this time.");
        delete pendingRegistrations[studentChatId];
    } else {
        bot.sendMessage(adminChannelId, `❌ Student with ID ${studentChatId} not found in pending registrations.`);
    }
}

// Callback query for admin actions
bot.on('callback_query', (callbackQuery) => {
    const data = callbackQuery.data;
    const chatId = callbackQuery.message.chat.id;

    if (data.startsWith('approve_')) {
        const studentChatId = data.split('_')[1];
        approveStudent(studentChatId);
    } else if (data.startsWith('reject_')) {
        const studentChatId = data.split('_')[1];
        rejectStudent(studentChatId);
    }
});

module.exports = bot;
