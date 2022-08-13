import mineflayer from "mineflayer";
import { pathfinder } from "mineflayer-pathfinder";
import autoEat from "mineflayer-auto-eat";
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
  bot.loadPlugin(autoEat);

  const data = new Bot(bot);

  bots.set(username, data);

  bot.on("end", () => {
    data.clearProcesses();
    bots.delete(username);
  });

  bot.on("goal_reached", () => {
    data.removeProcess("move");
  });
}
