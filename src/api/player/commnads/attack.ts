import mineflayer from "mineflayer";
import bots from "../util/bots";
import Bot from "../util/Bot";
import BotProcess from "../util/BotProcess";

export function Attack (parent: mineflayer.Bot, username: string, args: string[]): void {
  const mode = args[0];
  const delay = args[1];
  
  if (!bots.has(username) || username === parent.username) {
    parent.chat(`Child '${username}' does not exist.`);
    return;
  }

  const bot = bots.get(username) as Bot;

  switch (mode) {
    case "continuous":
      bot.addProcess("attack", new BotProcess((process) => {
        attack(bot);
        process.run();
      }));
      break;
    case "interval":
      if (parseInt(delay) > 0) {
        attack(bot);
        bot.addProcess("attack", new BotProcess((process) => {
          attack(bot);
          bot.client.waitForTicks(parseInt(delay)).then(() => {
            process.run();
          });
        }));
      } else {
        parent.chat(`Invalid delay: ${delay}`);
      }
      break;
    default:
      attack(bot);
      break;
  }
}

function attack (bot: Bot): void {
  let entity = (bot.client as any).entityAtCursor(3.5);
  if (entity) {
    bot.client.attack(entity);
  } else {
    bot.client.swingArm("right", true);
  }
}
