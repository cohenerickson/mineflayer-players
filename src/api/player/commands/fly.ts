import mineflayer from "mineflayer";
import bots from "../util/bots";
import Bot from "../util/Bot";
import BotProcess from "../util/BotProcess";

export function Fly (parent: mineflayer.Bot, username: string, args: string[]): void {
  if (!bots.has(username) || username === parent.username) {
    parent.chat(`Child '${username}' does not exist.`);
    return;
  }

  const bot = bots.get(username) as Bot;

  bot.addProcess("fly", new BotProcess(() => {
    bot.client.creative.startFlying();
  }, () => {
    bot.client.creative.stopFlying();
  }));
}
