import Discord = require('discord.js');

export interface ICommand {
    prefix: string;
    action: (message: Discord.Message, bot: Discord.Client) => Promise<void>;
}
