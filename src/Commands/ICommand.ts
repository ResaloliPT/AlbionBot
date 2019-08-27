import Discord = require("discord.js");

export interface ICommand {
    prefix: string;
    action: (message: Discord.Message) => void;
}