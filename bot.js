const dotenv = require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if(!msg.content.startsWith(process.env.PREFIX)) return;

    let data = msg.content.substring(0, msg.content.length).split(' ');
    let cmd = data[1];

    if (data[0] === '!stock') {
        switch (cmd) {
            case 'help':
                msg.channel.send({
                    embed: {
                        color: 3447003,
                        title: 'Stock Bot Help',
                        description: "Commands for the bot",
                        fields: [
                            {
                                name: "!stock find [ticker]",
                                value: "Find current stock price for ticker"
                            },
                            {
                                name: "!stock alert [ticker] [price]",
                                value: "Set alert for ticker to reach certain price"
                            }
                        ],
                        footer: {
                            text: "Values in [square brackets] are required"
                        }
                    }
                });
                break;
            case 'find':
                msg.channel.send({
                    embed: {
                        color: 3447003,
                        title: "Enter stock ticker here",
                        fields: [
                            {
                                value: "Show stock data"
                            }
                        ]
                    }
                });
                break;
            case 'alert':
                msg.channel.send({
                    embed: {
                        color: 3447003,
                        title: "Alert",
                        fields: [
                            {
                                value: "Alert has been set up for ticker - "
                            }
                        ]
                    }
                });
                break;
        }
    }

});

client.login(process.env.TOKEN);

