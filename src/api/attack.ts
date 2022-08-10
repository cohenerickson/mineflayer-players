import mineflayer from "mineflayer";
import bots from "../util/bots";
import Bot from "../types/Bot";
import BotProcess from "../util/BotProcess";

export function Attack (parent: mineflayer.Bot, username: string, mode: string, delay: string): void {
  if (!bots.has(username) || username === parent.username) {
    parent.chat(`Child '${username}' does not exist.`);
    return;
  }

  const data = bots.get(username) as Bot;
  const bot = data.bot;

  switch (mode) {
    case "continuous":
      attack(bot);
      // Kill existing process
      if (data.processes.has("attack")) (data.processes.get("attack") as BotProcess).kill();
      // Spawn new process
      data.processes.set("attack", new BotProcess((process) => {
        attack(bot);
        process.run();
      }));
      bots.set(username, data);
      break;
    case "interval":
      if (parseInt(delay) > 0) {
        attack(bot);
        // Kill existing process
        if (data.processes.has("attack")) (data.processes.get("attack") as BotProcess).kill();
        // Spawn new process
        data.processes.set("attack", new BotProcess((process) => {
          bot.waitForTicks(parseInt(delay)).then(() => {
            attack(bot);
            process.run();
          });
        }));
        bots.set(username, data);
      } else {
        parent.chat(`Invalid delay: ${delay}`);
      }
      break;
    default:
      attack(bot);
      break;
  }
}

function attack (bot: mineflayer.Bot): void {
  let entity = (bot as any).entityAtCursor(3.5);
  if (entity) {
    bot.attack(entity);
  } else {
    bot.swingArm("right", true);
  }
}
