const dotenv = require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === '!stock help') {
        msg.reply('!stock find - Find current price of a stock\n' +
            '!stock alert - Get Alerts about a stock');
    }
    if (msg.content === '!stock find') {
        msg.reply('Figure out how to add stock name');
    }
    if (msg.content === '!stock alert') {
        msg.reply('Figure out how to add alerts & connect to api');
    }
});

client.login(process.env.TOKEN);

