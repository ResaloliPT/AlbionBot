import { ICommand } from './ICommand';
import Discord = require('discord.js');

const BotRole = "AlbionBot";

export class CommandHandler {
    constructor(bot){
        this.bot = bot;
        this.registerCommands();
    }

    bot: Discord.Client;

    commands: { [prefix: string] : ICommand; } = {};

    handleCommand(messageIn: Discord.Message) : void {
        let message = messageIn.content;
        
        if(message.substring(0, 3).toLowerCase() != '!ab' && message.split(' ')[0].toLowerCase() != '!ab'){
            return;
        }
    
        let command = message.split(' ')[1].toLowerCase();

        if(this.commands[command] == undefined){
            messageIn.channel.send('This command doesn\'t exit!');

            return;
        }

        this.commands[command].action(messageIn);
    }

    registerCommands(){
        let helpCommand: ICommand = {
            prefix: "help",
            action: (message) => {
                message.channel.send(`
Bot prefix: !ab

Available Commands:
!ab help - Show This Readme
!ab role [role] - set yourself to the assigned role (will be logged);`);
            }
        };
        this.commands[helpCommand.prefix.toLowerCase()] = helpCommand;

        let helpAdminCommand: ICommand = {
            prefix: "helpAdmin",
            action: (message) => {
                if(!message.member.roles.has(BotRole)){
                    message.channel.send('You don\'t have permition to use this bot in admin mode!');
                    return;
                }
                message.channel.send(`
                Bot prefix: !ab

                Available Commands:
                
                !ab setRole [gameRole] [discordRole] - Assign a role to a Discord role`);
            }
        };
        this.commands[helpAdminCommand.prefix.toLowerCase()] = helpAdminCommand;

        let claimCommand: ICommand = {
            prefix: "claim",
            action: (message) => {
                if(message.member.roles.has(BotRole)){
                    message.channel.send('You already Claimed this bot.');
                    return;
                }

                message.guild.members.values()


                for (const member of  message.guild.members.values()) {
                    if(member.client.user.id == this.bot.user.id){
                        continue;
                    }

                    if(member.roles.has(BotRole)){   
                        message.channel.send(`Bot Already Claimed by ${member.displayName}`);
                        return;
                    }
                }

                message.member.addRole(message.guild.roles.find(role => role.name == BotRole).id);
            }
        };
        this.commands[claimCommand.prefix.toLowerCase()] = claimCommand;
    }
}