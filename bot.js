const dotenv = require('dotenv').config();
const Discord = require('discord.js');
const axios = require("axios");
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (!msg.content.startsWith(process.env.PREFIX)) return;

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
                let ticker = data[2].toLowerCase();
                if (ticker === '') {
                    msg.channel.send("Enter ticker");
                    return;
                }
                axios.post("https://www.nikhilkapadia.com/stock/api/findStock", {
                    stock: ticker,
                    timeSeries: "TIME_SERIES_INTRADAY",
                    interval: "1min",
                    outputSize: "compact"
                }).then(({data}) => {
                    let time = Object.keys(data)[Object.keys(data).length - 1]
                    let obj = data[time]
                    let open = obj['1. open']
                    let high = obj['2. high']
                    let low = obj['3. low']
                    let close = obj['4. close']
                    let volume = obj['5. volume']

                    msg.channel.send({
                        embed: {
                            color: 3447003,
                            title: ticker.toUpperCase() + " (USD)",
                            description: time,
                            fields: [
                                {
                                    name: "Open",
                                    value: open,
                                },
                                {
                                    name: "High",
                                    value: high,
                                },
                                {
                                    name: "Low",
                                    value: low,
                                },
                                {
                                    name: "Close",
                                    value: close,
                                },
                                {
                                    name: "Volume",
                                    value: volume,
                                }
                            ]
                        }
                    });
                })
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

