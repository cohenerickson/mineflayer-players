import mineflayer from "mineflayer";
import bots from "../util/bots";
import Bot from "../types/Bot";

export function Drop (parent: mineflayer.Bot, username: string): void {
  if (!bots.has(username) || username === parent.username) {
    parent.chat(`Child '${username}' does not exist.`);
    return;
  }

  const data = bots.get(username) as Bot;
  const bot = data.bot;

  let item = bot.heldItem;
  if (item) {
    bot.toss(item.type, null, 1);
    bot.equip(item.type, null);
  }
}
