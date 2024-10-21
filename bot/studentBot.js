const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
require('dotenv').config();

const token = process.env.STUDENT_BOT_TOKEN;
const adminChannelId = process.env.ADMIN_CHANNEL_ID;
const bot = new TelegramBot(token, { polling: true });

const adminId = process.env.ADMIN_ID;


const registrationLink = process.env.REGISTRATION_LINK; // 
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    // Send a welcome message
    bot.sendMessage(chatId, "Welcome to the Techtonic Tribe Bot! 🌟🙏");

    // Show the main menu
    if (chatId == adminId) {
        showAdminMenu(chatId);
    } else {
        showUserMenu(chatId);
    }
});

// Handle callback queries
bot.on('callback_query', (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const data = callbackQuery.data;

    if (chatId == adminId) {
        handleAdminCallback(chatId, data);
    } else {
        handleUserCallback(chatId, data);
    }

    bot.answerCallbackQuery(callbackQuery.id);
});

// Show user menu
function showUserMenu(chatId) {
    const menuOptions = registrationLink 
        ? [{ text: 'Register', web_app: { url: registrationLink } }] 
        : [{ text: 'Register', callback_data: 'registration_closed' }];

    bot.sendMessage(chatId, 'Please choose an option:', {
        reply_markup: {
            inline_keyboard: [
                menuOptions,
                [{ text: 'Information', callback_data: 'info' }],
                [{ text: 'Education', callback_data: 'education' }],
                [{ text: 'Support & Discussion Group', callback_data: 'support' }],
                [{ text: 'Direct Contact', callback_data: 'contact' }]
            ]
        }
    });
}

// Handle user callback queries
function handleUserCallback(chatId, data) {
    switch (data) {
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
            bot.sendMessage(chatId, 'For direct contacts, please reach out to .');
            break;
        case 'registration_closed':
            bot.sendMessage(chatId, 'Registration is closed.');
            break;
    }
}

// Show admin menu
function showAdminMenu(chatId) {
    bot.sendMessage(chatId, 'Welcome Admin! Please choose an option:', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'View Registrations', callback_data: 'view_registrations' }],
                [{ text: 'Statistics', callback_data: 'statistics' }]
            ]
        }
    });
}

// Handle admin callback queries
function handleAdminCallback(chatId, data) {
    // Example for handling the view registrations callback
    if (data === 'view_registrations') {
        if (registrationLink) {
            bot.sendMessage(chatId, `Registration link is available: ${registrationLink}`);
        } else {
            bot.sendMessage(chatId, 'Registration is closed.');
        }
    }
}
