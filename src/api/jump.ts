import mineflayer from "mineflayer";
import bots from "../util/bots";
import Bot from "../types/Bot";
import BotProcess from "../util/BotProcess";

export function Jump (parent: mineflayer.Bot, username: string, mode: string, delay: string): void {
  if (!bots.has(username) || username === parent.username) {
    parent.chat(`Child '${username}' does not exist.`);
    return;
  }

  const data = bots.get(username) as Bot;
  const bot = data.bot;

  switch (mode) {
    case "continuous":
      // Kill existing process
      if (data.processes.has("jump")) (data.processes.get("jump") as BotProcess).kill();
      // Spawn new process
      data.processes.set("jump", new BotProcess(() => {
        bot.setControlState("jump", true);
      }, () => {
        bot.setControlState("jump", false);
      }));
      break;
    case "interval":
      // Kill existing process
      if (data.processes.has("jump")) (data.processes.get("jump") as BotProcess).kill();
      // Spawn new process
      data.processes.set("jump", new BotProcess((process) => {
        bot.waitForTicks(parseInt(delay)).then(() => {
          bot.setControlState("jump", true);
          bot.setControlState("jump", false);
          process.run();
        });
      }));
    default:
      bot.setControlState("jump", true);
      bot.setControlState("jump", false);
      break;
  }
}
