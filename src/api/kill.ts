import mineflayer from "mineflayer";
import bots from "../util/bots";
import Bot from "../types/Bot";
import BotProcess from "../util/BotProcess";

// Kill child
export function Kill (parent: mineflayer.Bot, username: string): void {
  if (!bots.has(username) || username === parent.username) {
    parent.chat(`Child '${username}' does not exist.`);
    return;
  }

  const data = bots.get(username) as Bot;
  const bot = data.bot;

  data.processes.forEach((process: BotProcess, index: any) => {
    process.kill();
    data.processes.delete(index);
  });

  bots.delete(username);
  bot.end();
}
