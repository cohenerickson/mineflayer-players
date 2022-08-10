import mineflayer from "mineflayer";
import bots from "../util/bots";
import Bot from "../types/Bot";

export function Dropstack (parent: mineflayer.Bot, username: string): void {
  if (!bots.has(username) || username === parent.username) {
    parent.chat(`Child '${username}' does not exist.`);
    return;
  }

  const data = bots.get(username) as Bot;
  const bot = data.bot;

  if (bot.heldItem) bot.tossStack(bot.heldItem);
}
