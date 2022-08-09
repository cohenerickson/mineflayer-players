import mineflayer from "mineflayer";
import { pathfinder } from "mineflayer-pathfinder";
import * as config from "../../config.json";
import debug from "../debug";
import bots from "../bots";

export function Spawn (parent: mineflayer.Bot, username: string): void {
  if (bots.has(username)) {
    debug(`Child ${username} already exists.`);
    parent.chat(`Child ${username} already exists.`);
    return;
  };

  const bot: any = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username
  });

  debug("Successfully spawned child:", username);

  bot.loadPlugin(pathfinder);

  debug("successfully loaded pathfinder plugin.");

  bots.set(username, bot);

  debug("Successfully added child to bots.");
}
