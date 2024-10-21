const QRCode = require('qrcode'); // Make sure to install the qrcode package
const fs = require('fs'); // File system module to save the QR code image

function approveStudent(studentChatId) {
    const studentData = pendingRegistrations[studentChatId];
    if (studentData) {
        const idNumber = studentData.idNumber; // Assuming idNumber is stored in studentData

        // Generate QR code
        QRCode.toFile(`./qr_codes/${idNumber}.png`, `ID Number: ${idNumber}`, (err) => {
            if (err) {
                console.error('Error generating QR code:', err);
                return;
            }

            // Send approval message along with the QR code
            bot.sendMessage(studentChatId, "🎉🎊 Congratulations! 🎊🎉 Your registration has been successfully approved! 🌟✨ Our office location is [here](https://maps.app.goo.gl/SjmxFtyEenXJcCE89). Please reach out to @bkhappy for further instructions.");

            // Send the QR code
            bot.sendPhoto(studentChatId, `./qr_codes/${idNumber}.png`, { caption: `Your QR code:\nID Number: ${idNumber}` });

            // Clean up: delete the QR code file after sending
            fs.unlink(`./qr_codes/${idNumber}.png`, (err) => {
                if (err) console.error('Error deleting QR code:', err);
            });
        });

        delete pendingRegistrations[studentChatId];
    }
}
