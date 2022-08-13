import mineflayer from "mineflayer";
import bots from "../util/bots";
import Bot from "../util/Bot";

export function Unfly (parent: mineflayer.Bot, username: string, args: string[]): void {
  if (!bots.has(username) || username === parent.username) {
    parent.chat(`Child '${username}' does not exist.`);
    return;
  }

  const bot = bots.get(username) as Bot;

  bot.removeProcess("fly");
}
