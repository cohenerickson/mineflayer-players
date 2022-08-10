import mineflayer from "mineflayer";
import bots from "../util/bots";
import Bot from "../types/Bot";

export function Mount (parent: mineflayer.Bot, username: string) {
  if (!bots.has(username) || username === parent.username) {
    parent.chat(`Child '${username}' does not exist.`);
    return;
  }

  const data = bots.get(username) as Bot;
  const bot: mineflayer.Bot = data.bot;

  bot.nearestEntity((entity) => {
    bot.mount(entity);
    return false;
  });
}
