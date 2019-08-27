import Discord = require('discord.js');
import fs = require('fs');
import path = require('path');
import { ICommand } from './ICommand';

export class CommandHandler {
  public bot: Discord.Client;

  public commands: { [prefix: string]: ICommand } = {};

  constructor(bot: Discord.Client) {
    this.bot = bot;
    this.registerCommands();
  }

  public async handleCommand(messageIn: Discord.Message): Promise<void> {
    const message = messageIn.content;

    if (message.substring(0, 3).toLowerCase() !== '!ab' && message.split(' ')[0].toLowerCase() !== '!ab') {
      return;
    }

    const command = message.split(' ')[1].toLowerCase();

    if (this.commands[command] === undefined) {
      await messageIn.channel.send('This command doesn\'t exit!');

      return;
    }

    await this.commands[command].action(messageIn, this.bot);
  }

  public registerCommands() {
    fs.readdirSync(__dirname)
      .filter((file) => {
        return file.endsWith('.cmd.js');
      })
      .forEach((file) => {
        const command: ICommand = (require(path.resolve(__dirname, file)).default);
        this.commands[command.prefix.toLowerCase()] = command;
      });
  }
}
