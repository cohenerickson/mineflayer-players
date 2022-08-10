import mineflayer from "mineflayer";
import bots from "../util/bots";
import Bot from "../types/Bot";
import BotProcess from "../util/BotProcess";

export function Use (parent: mineflayer.Bot, username: string, mode: string, delay: string): void {
  if (!bots.has(username) || username === parent.username) {
    parent.chat(`Child '${username}' does not exist.`);
    return;
  }

  const data = bots.get(username) as Bot;
  const bot = data.bot;

  switch (mode) {
    case "continuous":
      use(bot);
      // Kill existing process
      if (data.processes.has("use")) (data.processes.get("use") as BotProcess).kill();
      // Spawn new process
      data.processes.set("use", new BotProcess((process) => {
        use(bot);
        process.run();
      }));
      bots.set(username, data);
    case "interval":
      if (parseInt(delay) > 0) {
        use(bot);
        // Kill existing process
        if (data.processes.has("use")) (data.processes.get("use") as BotProcess).kill();
        // Spawn new process
        data.processes.set("use", new BotProcess((process) => {
          bot.waitForTicks(parseInt(delay)).then(() => {
            use(bot);
            process.run();
          });
        }));
        bots.set(username, data);
      } else {
        parent.chat(`Invalid delay: ${delay}`);
      }
      break;
    default:
      use(bot);
      break;
  }
}

function use (bot: mineflayer.Bot): void {
  let entity = (bot as any).entityAtCursor(3.5);
  if (entity) {
    bot.activateEntity(entity);
  } else {
    bot.activateItem();
    bot.deactivateItem();
  }
}
