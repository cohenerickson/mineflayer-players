import mineflayer from "mineflayer";
import bots from "../../util/bots";
import Bot from "../../util/Bot";
import BotProcess from "../../util/BotProcess";

export function Jump (parent: mineflayer.Bot, username: string, args: string[]): void {
  const mode = args[0];
  const delay = args[1];
  
  if (!bots.has(username) || username === parent.username) {
    parent.chat(`Child '${username}' does not exist.`);
    return;
  }

  const bot = bots.get(username) as Bot;

  switch (mode) {
    case "continuous":
      bot.addProcess("jump", new BotProcess(() => {
        bot.client.setControlState("jump", true);
      }, () => {
        bot.client.setControlState("jump", false);
      }));
      break;
    case "interval":
      bot.addProcess("jump", new BotProcess((process) => {
        bot.client.setControlState("jump", true);
        bot.client.setControlState("jump", false);
        bot.client.waitForTicks(parseInt(delay)).then(() => {
          process.run();
        });
      }));
      break;
    default:
      bot.client.setControlState("jump", true);
      bot.client.setControlState("jump", false);
      break;
  }
}
