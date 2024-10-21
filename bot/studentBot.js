require('dotenv').config(); // Load environment variables from .env file
const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN); // Use the bot token from the .env file

bot.start((ctx) => {
    ctx.reply('Welcome! Type "Register" to begin the registration process.');
});

bot.command('register', (ctx) => {
    ctx.reply('Click the button below to register:',
        Markup.inlineKeyboard([
            Markup.button.webApp('Register', 'https://miniapp-ten-zeta.vercel.app/')
        ])
    );
});

bot.on('text', (ctx) => {
    if (ctx.message.text.toLowerCase() === 'register') {
        ctx.reply('Click the button below to register:',
            Markup.inlineKeyboard([
                Markup.button.webApp('Register', 'https://miniapp-ten-zeta.vercel.app/')
            ])
        );
    }
});

bot.catch((err) => {
    console.error('Error in bot:', err);
});

bot.launch()
    .then(() => {
        console.log('Bot is running...');
    })
    .catch(err => {
        console.error('Failed to launch bot:', err);
    });
