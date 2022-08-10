import mineflayer from "mineflayer";
import bots from "../util/bots";
import Bot from "../types/Bot";
import BotProcess from "../util/BotProcess";

export function Sprint (parent: mineflayer.Bot, username: string): void {
  if (!bots.has(username) || username === parent.username) {
    parent.chat(`Child '${username}' does not exist.`);
    return;
  }

  const data = bots.get(username) as Bot;
  const bot = data.bot;

  // Kill existing process
  if (data.processes.has("sprint")) (data.processes.get("sprint") as BotProcess).kill();
  // Spawn new process
  data.processes.set("sprint", new BotProcess(
    () => {
      bot.setControlState("sprint", true);
    },
    () => {
      bot.setControlState("sprint", false);
    }
  ));
}
