import mineflayer from "mineflayer";
import bots from "../util/bots";
import Bot from "../types/Bot";
import BotProcess from "../util/BotProcess";

export function Unsneak (parent: mineflayer.Bot, username: string): void {
  if (!bots.has(username) || username === parent.username) {
    parent.chat(`Child '${username}' does not exist.`);
    return;
  }

  const data = bots.get(username) as Bot;

  // Kill existing process
  if (data.processes.has("sneak")) (data.processes.get("sneak") as BotProcess).kill();
}
