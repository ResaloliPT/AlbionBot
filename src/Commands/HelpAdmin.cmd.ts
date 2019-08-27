import config = require('../config.js');
import { ICommand } from './ICommand';

const command: ICommand = {
  action: async (message, bot) => {
    if (!message.member.roles.has(config.botRole)) {
      await message.channel.send('You don\'t have permition to use this bot in admin mode!');
      return;
    }
    await message.channel.send(`
            Bot prefix: !ab

            Available Commands:

            !ab setRole [gameRole] [discordRole] - Assign a role to a Discord role`);
  },
  prefix: 'helpAdmin',
};

export default command;
