import mineflayer from "mineflayer";
import bots from "../../util/bots";
import Bot from "../../util/Bot";
import BotProcess from "../../util/BotProcess";

// Kill child
export function Kill (parent: mineflayer.Bot, username: string): void {
  if (!bots.has(username) || username === parent.username) {
    parent.chat(`Child '${username}' does not exist.`);
    return;
  }

  const bot = bots.get(username) as Bot;

  bot.clearProcesses();

  bots.delete(username);
  bot.client.end();
}
