// bot.js
const TelegramBot = require('node-telegram-bot-api');
const { createWorker } = require('@zxing/library');

const token = '7970158260:AAEVS2QEkTqC3uOm9V2U6GoyCgNI9loVlB4'; // Replace with your bot token
const bot = new TelegramBot(token, { polling: true });

// Sample data for testing (IDs and user names)
const attendanceData = {
   "1": { description: "DBU1601272" },
    "2": { name: "Jane Smith" },
    "3": { name: "Alice Johnson" }
};

// Command to start scanning
bot.onText(/\/scan/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'The QR code scanner is starting. Please check your terminal.');
    // Call the QR scanner function
    startQrScanner(chatId);
});

// Function to start the QR scanner
async function startQrScanner(chatId) {
    const worker = createWorker();

    // Load the worker
    await worker.load();
    await worker.loadBarcodes();
    console.log('QR scanner is running...');

    // Using the webcam to capture frames
    const { exec } = require('child_process');
    exec('node webcam-capture.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });

    // Listen for incoming frames (this part would require additional handling in a real setup)
    // Scan the frames and decode
    // (This part would usually involve a library to access the webcam and get frames for scanning)

    // Example simulation of scanning (you would replace this with actual frame capture logic)
    const simulateScanning = async () => {
        for (const id of Object.keys(attendanceData)) {
            const result = await worker.recognize(id);
            if (result) {
                const message = `Attendance marked for: ${attendanceData[id].name}`;
                bot.sendMessage(chatId, message);
            }
        }
    };

    simulateScanning().then(() => worker.terminate());
}

console.log('Bot is running...');
