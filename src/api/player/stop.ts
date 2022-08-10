import mineflayer from "mineflayer";
import bots from "../../util/bots";
import Bot from "../../util/Bot";
import BotProcess from "../../util/BotProcess";

export function Stop (parent: mineflayer.Bot, username: string): void {
  if (!bots.has(username) || username === parent.username) {
    parent.chat(`Child '${username}' does not exist.`);
    return;
  }

  const data = bots.get(username) as Bot;

  data.clearProcesses();
}