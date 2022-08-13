import mineflayer from "mineflayer";
import bots from "../util/bots";
import Bot from "../util/Bot";
import BotProcess from "../util/BotProcess";

export function Eat (parent: mineflayer.Bot, username: string, args: string[]): void {
  const mode = args[0];
  const delay = args[1];
  
  if (!bots.has(username) || username === parent.username) {
    parent.chat(`Child '${username}' does not exist.`);
    return;
  }

  const bot = bots.get(username) as Bot;

  switch (mode) {
    case "continuous":
      bot.addProcess("eat", new BotProcess((process) => {
        (bot.client as any).autoEat.eat();
        bot.client.waitForTicks(10).then(() => {
          process.run();
        });
      }));
    case "interval":
      if (parseInt(delay) > 0) {
        bot.addProcess("eat", new BotProcess((process) => {
          (bot.client as any).autoEat.eat();
          bot.client.waitForTicks(parseInt(delay)).then(() => {
            process.run();
          });
        }));
      } else {
        parent.chat(`Invalid delay: ${delay}`);
      }
      break;
    default:
      console.log("eating");
      (bot.client as any).autoEat.eat();
      break;
  }
}
