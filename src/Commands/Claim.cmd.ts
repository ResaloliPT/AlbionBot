import config = require('../config.js');
import { ICommand } from './ICommand';

const command: ICommand = {
  action: async (message, bot) => {
    if (message.member.roles.has(config.botRole)) {
      await message.channel.send('You already Claimed this bot.');
      return;
    }

    message.guild.members.values();

    for (const member of message.guild.members.values()) {
      if (member.client.user.id == bot.user.id) {
        continue;
      }

      if (member.roles.has(config.botRole)) {
        await message.channel.send(`Bot Already Claimed by ${member.displayName}`);
        return;
      }
    }

    await message.member.addRole(message.guild.roles.find((role) => role.name === config.botRole).id);
  },
  prefix: 'help',
};

export default command;
