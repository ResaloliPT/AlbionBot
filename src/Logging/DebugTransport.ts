import debug = require('debug');
import Transport = require('winston-transport');

const BotLogger = debug('AlbionBot');

//
// Inherit from `winston-transport` so you can take advantage
// of the base functionality and `.exceptions.handle()`.
//
export default class DebugLogger extends Transport {
  constructor(opts) {
    super(opts);
  }

  public log(info: {message: string, level: string}, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });
    BotLogger(info.message);
    callback();
  }
}
