import mineflayer from "mineflayer";
import { pathfinder } from "mineflayer-pathfinder";
import * as config from "../../config.json";
import bots from "../util/bots";
import BotProcess from "../util/BotProcess";

// Spawn child
export function Spawn (parent: mineflayer.Bot, username: string): void {
  if (bots.has(username) || username === parent.username) {
    parent.chat(`Child '${username}' already exists.`);
    return;
  };

  const bot: any = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username
  });

  bot.loadPlugin(pathfinder);

  bots.set(username, {
    bot,
    processes: new Map() as Map<string, BotProcess>
  });
}
