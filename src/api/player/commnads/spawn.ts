import mineflayer from "mineflayer";
import { pathfinder } from "mineflayer-pathfinder";
import bots from "../util/bots";
import Bot from "../util/Bot";

// Spawn child
export function Spawn (parent: mineflayer.Bot, username: string, args: string[]): void {
  if (bots.has(username) || username === parent.username) {
    parent.chat(`Child '${username}' already exists.`);
    return;
  };

  const bot: any = mineflayer.createBot({
    host: process.env.MC_HOST as string,
    port: parseInt(process.env.MC_PORT as string) as number,
    username
  });

  bot.loadPlugin(pathfinder);

  bots.set(username, new Bot(bot));

  bot.on("end", () => {
    const data = bots.get(username) as Bot;

    data.clearProcesses();
    
    bots.delete(username);
  });
}
