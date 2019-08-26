import Discord = require('discord.io');

export class CommandHandler {
    constructor(bot: Discord.Client){
        this.bot = bot;
    }

    bot: Discord.Client;

    handleCommand(commandOption: CommandOptions) : void {
        let message = commandOption.message;

        if(message.substring(0, 3).toLowerCase() != '!ab' && message.split(' ')[0].toLowerCase() != '!ab'){
            return;
        }
    
        let command = message.split(' ')[1].toLowerCase();

        switch(command){
            case 'ping':
            this.bot.sendMessage({to: commandOption.channelID, message: 'Pong!'})
            break;
        }
    }
}

export interface CommandOptions {
    user: string,
    userID: string,
    channelID: string,
    message: string,
    event: WebSocketEvent
}

interface WebSocketEvent {
    d: any;
    op: number;
    s: number;
    t: string;
}