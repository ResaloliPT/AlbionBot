import { ICommand } from './ICommand';

const command: ICommand = {
  action: async (message, bot) => {
    await message.channel.send(`
Bot prefix: !ab

Available Commands:
!ab help - Show This Readme
!ab role [role] - set yourself to the assigned role (will be logged);`);
  },
  prefix: 'help',
};

export default command;
