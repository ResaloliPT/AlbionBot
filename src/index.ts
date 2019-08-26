import Discord = require('discord.io');
import logger = require('winston');
const auth = require('../auth.json');

import CommandHandler = require('./CommandHandler');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console());


logger.level = 'debug';


// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true,
});


const commandHandler = new CommandHandler.CommandHandler(bot)

bot.on('ready', evt => {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    bot.presenceStatus = "online";
    bot.setPresence({
        game: {
            name: "Use \'!ab help\' for commands!",
            type: 0
          },
          idle_since: 0
    })
});


bot.on('message', (user, userID, channelID, message, event) => {
    commandHandler.handleCommand({user, userID, channelID, message, event});
});
