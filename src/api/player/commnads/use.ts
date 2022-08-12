import mineflayer from "mineflayer";
import bots from "../util/bots";
import Bot from "../util/Bot";
import BotProcess from "../util/BotProcess";

export function Use (parent: mineflayer.Bot, username: string, args: string[]): void {
  const mode = args[0];
  const delay = args[1];

  if (!bots.has(username) || username === parent.username) {
    parent.chat(`Child '${username}' does not exist.`);
    return;
  }

  const bot = bots.get(username) as Bot;

  switch (mode) {
    case "continuous":
      bot.addProcess("use", new BotProcess((process) => {
        use(bot);
        process.run();
      }));
      break;
    case "interval":
      if (parseInt(delay) > 0) {
        bot.addProcess("use", new BotProcess((process) => {
          use(bot);
          bot.client.waitForTicks(parseInt(delay)).then(() => {
            process.run();
          });
        }));
      } else {
        parent.chat(`Invalid delay: ${delay}`);
      }
      break;
    default:
      use(bot);
      break;
  }
}

function use (bot: Bot): void {
  let entity = (bot.client as any).entityAtCursor(3.5);
  if (entity) {
    bot.client.activateEntity(entity);
  } else {
    bot.client.activateItem();
    bot.client.deactivateItem();
  }
}
