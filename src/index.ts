import Discord = require('discord.js');
import logger = require('winston');
import cmdHandler = require('./Commands/CommandHandler');
import persistence = require('./persistence/index');

const auth = require('../auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console());
logger.level = 'debug';

var models = new persistence.Sequelize({
    logging: logger.debug
}).database;

const prepareBot: (bot: Discord.Client) => Promise<void> =  (bot) => {
    return new Promise((resolve, reject) => {
        logger.info('Connected');
        logger.info('Logged in as: ');
        logger.info(bot.user.username + ' - (' + bot.user.id + ')');
        bot.user.setPresence({
            status: "online",
            afk: false,
            game: {
                name: "Use \'!ab help\' for commands!",
                type: "WATCHING"
            }
        })
        resolve();
    })
}

const startBot: () => Promise<Discord.Client> =  () => {
    return new Promise((resolve, reject) => {
        // Initialize Discord Bot
        var bot = new Discord.Client();

        const commandHandler = new cmdHandler.CommandHandler(bot)

        bot.on('message', message => {
            if(bot.user.id != message.author.id){
                commandHandler.handleCommand(message);
            }
        });

        bot.on('ready', ()=>{
            resolve(bot);
        });

        bot.on('error', reject);

        bot.login(auth.token);
    })
}

models
.sync({ force: false }) //Set to true to create database
.then(startBot) //Connect the bot
.then(prepareBot) //Set bot status
.catch(error => {
    logger.error(error)
})
