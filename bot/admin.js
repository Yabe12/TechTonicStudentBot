const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
require('dotenv').config();

const token = process.env.STUDENT_BOT_TOKEN;
const bot = new TelegramBot(token);

const adminChannelId = process.env.ADMIN_CHANNEL_ID;
const privateGroupChannelId = process.env.PRIVATE_GROUP_CHANNEL_ID;

let pendingRegistrations = {};

// Approve a student
function approveStudent(studentChatId) {
    const studentData = pendingRegistrations[studentChatId];
    if (studentData) {
        bot.sendMessage(studentChatId, "🎉🎊 Congratulations! 🎊🎉 Your registration has been successfully approved! 🌟✨ Our office location is [here](https://maps.app.goo.gl/SjmxFtyEenXJcCE89). Please reach out to @bkhappy for further instructions.");
        delete pendingRegistrations[studentChatId];
    }
}

// Reject a student
function rejectStudent(studentChatId) {
    bot.sendMessage(studentChatId, "We're sorry, but your registration has been rejected. Thank you for your interest! 🙏");
    delete pendingRegistrations[studentChatId];
}
// Send student data to private group as JSON
function sendStudentDataAsJson(studentChatId) {
    const studentData = pendingRegistrations[studentChatId];
    if (studentData) {
        const jsonData = {
            fullName: studentData.fullName,
            idNumber: studentData.idNumber,
            email: studentData.email
        };

        const jsonFilePath = `./student_data/${studentData.idNumber}.json`;
        fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));

        // Send the JSON file to the private group channel
        bot.sendDocument(privateGroupChannelId, jsonFilePath, {
            caption: `Student Data - ${studentData.fullName}`
        });

        bot.sendMessage(adminChannelId, `📄 Student data for ${studentData.fullName} has been sent to the private group channel.`);
    } else {
        bot.sendMessage(adminChannelId, `❌ Student with ID ${studentChatId} not found in pending registrations.`);
    }
}

// Callback query for admin actions
bot.on('callback_query', (callbackQuery) => {
    const data = callbackQuery.data;
    const studentChatId = data.split('_')[1];

    if (data.startsWith('approve_')) {
        approveStudent(studentChatId);
    } else if (data.startsWith('reject_')) {
        rejectStudent(studentChatId);
    } else if (data.startsWith('send_')) {
        sendStudentDataAsJson(studentChatId);
    }
});

module.exports = bot;
