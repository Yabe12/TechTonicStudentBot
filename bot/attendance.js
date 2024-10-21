const TelegramBot = require('node-telegram-bot-api');
const { google } = require('googleapis');
const fs = require('fs');
require('dotenv').config();

// Set up Telegram bot
const token = process.env.BOT_TOKEN; // Your bot token
const bot = new TelegramBot(token, { polling: true });

// Load Google Sheets credentials
const credentials = JSON.parse(fs.readFileSync('path/to/your/credentials.json'));
const sheets = google.sheets({ version: 'v4', auth: credentials });

// Spreadsheet ID and range (customize as per your sheet)
const SPREADSHEET_ID = process.env.SPREADSHEET_ID; // Your Google Sheet ID
const RANGE = 'Sheet1!A:B'; // Assuming User ID is in column A and Attendance in column B

// Start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Welcome! Please send your ID to check in for attendance.");
});

// Handle incoming messages (for ID scanning)
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.text.trim();

    // Check if the user ID exists in the Google Sheet
    const isIdValid = await checkIdInSheet(userId);

    if (isIdValid) {
        // Log attendance if the ID is found
        await logAttendance(userId);
        bot.sendMessage(chatId, `Attendance recorded for ID: ${userId}`);
    } else {
        bot.sendMessage(chatId, "ID not found. Please send a valid ID.");
    }
});

// Function to check if ID exists in Google Sheets
async function checkIdInSheet(id) {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: RANGE,
        });

        const rows = response.data.values;

        // Check if the ID exists in the first column (User ID)
        if (rows) {
            for (const row of rows) {
                if (row[0] === id) {
                    return true; // ID found
                }
            }
        }
        return false; // ID not found
    } catch (error) {
        console.error('Error reading from Google Sheets:', error);
        return false;
    }
}

// Function to log attendance in Google Sheets
async function logAttendance(userId) {
    const date = new Date().toLocaleDateString();
    const attendanceRow = [[userId, date]]; // Row to add (User ID and date)

    try {
        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Sheet1!A:B', // Adjust if necessary
            valueInputOption: 'RAW',
            resource: {
                values: attendanceRow,
            },
        });
    } catch (error) {
        console.error('Error logging attendance in Google Sheets:', error);
    }
}
