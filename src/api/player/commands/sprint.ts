import mineflayer from "mineflayer";
import bots from "../util/bots";
import Bot from "../util/Bot";
import BotProcess from "../util/BotProcess";

export function Sprint (parent: mineflayer.Bot, username: string, args: string[]): void {
  if (!bots.has(username) || username === parent.username) {
    parent.chat(`Child '${username}' does not exist.`);
    return;
  }

  const bot = bots.get(username) as Bot;

  bot.addProcess("sprint", new BotProcess(
    () => {
      bot.client.setControlState("sprint", true);
    },
    () => {
      bot.client.setControlState("sprint", false);
    }
  ));
}
