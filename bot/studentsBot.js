// student.js
const TelegramBot = require('node-telegram-bot-api');
const QRCode = require('qrcode');
require('dotenv').config();

const token = process.env.STUDENT_BOT_TOKEN;
const adminChannelId = process.env.ADMIN_CHANNEL_ID;
const bot = new TelegramBot(token, { polling: true });

let pendingRegistrations = {}; // To store registration data temporarily

// Start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Welcome to Kuraze Internship Bot! 🌟🙏");
    showUserMenu(chatId);
});

// Show user menu
function showUserMenu(chatId) {
    bot.sendMessage(chatId, 'Please choose an option:', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Register', callback_data: 'register' }],
                [{ text: 'Information', callback_data: 'info' }],
                [{ text: 'Education', callback_data: 'education' }],
                [{ text: 'Support & Discussion Group', callback_data: 'support' }],
                [{ text: 'Direct Contact', callback_data: 'contact' }]
            ]
        }
    });
}

// Handle user callback queries
bot.on('callback_query', (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const data = callbackQuery.data;

    switch (data) {
        case 'register':
            showPolicyAndAgreement(chatId);
            break;
        case 'info':
            bot.sendMessage(chatId, 'Here is the official channel link for more information: [Official Channel](t.me/TechTonicTribe)', { parse_mode: 'Markdown' });
            break;
        case 'education':
            bot.sendMessage(chatId, 'Visit our educational website for learning materials and also share opportunities: [Educational Website](t.me/Techtonic_Tribe/7)', { parse_mode: 'Markdown' });
            break;
        case 'support':
            bot.sendMessage(chatId, 'Join our support & discussion group here: [Support & Discussion Group](t.me/Techtonic_Tribe)', { parse_mode: 'Markdown' });
            break;
        case 'contact':
            bot.sendMessage(chatId, 'For direct contacts, please reach out to us.');
            break;
    }
});

// Show policy and agreement before registration
function showPolicyAndAgreement(chatId) {
    const policyMessage = `📜 *Policy and Agreement* 📜

Before proceeding with the registration, please read the following terms carefully:
1. By registering, you agree to provide accurate information.
2. You accept that the internship will require your full commitment.
3. Your personal data will be handled confidentially.

Read the full policy here: [Techtonic Tribe Policy](https://telegra.ph/Techtonic-Tribe-Policy-10-21)

Do you agree to the terms?`;

    bot.sendMessage(chatId, policyMessage, {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Yes, I agree', callback_data: 'agree_policy' }],
                [{ text: 'No, I do not agree', callback_data: 'disagree_policy' }]
            ]
        }
    });
}

// Handle policy agreement callback
bot.on('callback_query', (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const data = callbackQuery.data;

    if (data === 'agree_policy') {
        startRegistration(chatId);
    } else if (data === 'disagree_policy') {
        bot.sendMessage(chatId, 'You have declined the policy. Unfortunately, you cannot proceed with the registration without agreeing to the terms.');
    }
});

// Start registration process
function startRegistration(chatId) {
    const registrationSteps = [
        { message: 'Please provide your full name (e.g., John Doe):', key: 'fullName' },
        { message: 'Please provide your ID number:', key: 'idNumber' },
        { message: 'Please provide your sex (Male/Female):', key: 'sex' },
        { message: 'Please provide your age:', key: 'age', parse: (msg) => parseInt(msg.text, 10) },
        { message: 'Please provide your department (e.g., Computer Science):', key: 'department' },
        { message: 'Please provide your phone number (e.g., 0912345678):', key: 'phoneNumber', validate: validatePhoneNumber },
        { message: 'Please provide your email address (e.g., example@domain.com):', key: 'email', validate: validateEmail },
        { message: 'Please provide your interests (e.g., Backend, Frontend, Mobile):', key: 'interests', parse: (msg) => msg.text.split(',').map(interest => interest.trim()) },
        { message: 'Please provide your previous experience (if any) or type "None":', key: 'experience' }
    ];

    askRegistrationQuestions(chatId, registrationSteps);
}

// Ask registration questions
function askRegistrationQuestions(chatId, steps, index = 0, data = {}) {
    if (index < steps.length) {
        const step = steps[index];
        bot.sendMessage(chatId, step.message);
        bot.once('message', (msg) => {
            const value = step.parse ? step.parse(msg) : msg.text;
            if (step.validate && !step.validate(value)) {
                bot.sendMessage(chatId, `Invalid input. Please try again.`);
                return askRegistrationQuestions(chatId, steps, index, data);
            }
            data[step.key] = value;
            askRegistrationQuestions(chatId, steps, index + 1, data);
        });
    } else {
        askForDocuments(chatId, data);
    }
}

// Phone number validation
function validatePhoneNumber(phoneNumber) {
    return /^09\d{8}$/.test(phoneNumber);
}

// Email validation
function validateEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

// Ask for profile picture and resume
function askForDocuments(chatId, registrationData) {
    bot.sendMessage(chatId, "Please upload your profile picture:");
    bot.once('photo', (photo) => {
        const fileId = photo.photo[photo.photo.length - 1].file_id;
        bot.sendMessage(chatId, "Please upload your resume file (PDF or Word):");
        bot.once('document', (doc) => {
            const resumeFileId = doc.document.file_id;
            saveRegistrationData(chatId, { ...registrationData, fileId, resumeFileId });
        });
    });
}

// Save registration data and send to admin channel
function saveRegistrationData(chatId, studentData) {
    // Store the registration data temporarily
    pendingRegistrations[chatId] = studentData;

    const registrationMessage = `*New Registration Request:*
*Name:* ${studentData.fullName}
*ID Number:* ${studentData.idNumber}
*Sex:* ${studentData.sex}
*Age:* ${studentData.age}
*Department:* ${studentData.department}
*Phone:* ${studentData.phoneNumber}
*Email:* ${studentData.email}
*Interests:* ${studentData.interests.join(', ')}
*Experience:* ${studentData.experience}`;

    bot.sendPhoto(adminChannelId, studentData.fileId, {
        caption: registrationMessage,
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Approve', callback_data: `approve_${chatId}` }],
                [{ text: 'Reject', callback_data: `reject_${chatId}` }]
            ]
        }
    });

    // Send the resume to the admin channel
    bot.sendDocument(adminChannelId, studentData.resumeFileId, {
        caption: `Resume of ${studentData.fullName}`,
        parse_mode: 'Markdown'
    });

    bot.sendMessage(chatId, '✔️ Your registration is complete! If you are selected for this internship, we will send you a message. Thank you! 🙏🌟');
}

module.exports = bot;
