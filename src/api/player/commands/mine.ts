import mineflayer from "mineflayer";
import bots from "../util/bots";
import Bot from "../util/Bot";
import { Vec3 } from "vec3";
import BotProcess from "../util/BotProcess";
import { goals, Movements } from "mineflayer-pathfinder";
import mcData from "minecraft-data";

export function Mine (parent: mineflayer.Bot, username: string, args: string[]): void {
  let name = args[0].replace(/^minecraft:/, "");
  if (!bots.has(username) || username === parent.username) {
    parent.chat(`Child '${username}' does not exist.`);
    return;
  }

  const data = bots.get(username) as Bot;

  const movements = new Movements(data.client, mcData(data.client.version))

  data.addProcess("mine", new BotProcess(async (process) => {
    data.client.pathfinder.stop();
    const position = findBlock(data.client, name);
    console.log(position);
    if (position) {

      parent.chat("Found Position");
      let goal = new goals.GoalNear(position.x, position.y, position.z, 1);
      data.client.pathfinder.stop();
      data.client.pathfinder.setMovements(movements);
      data.client.pathfinder.goto(goal).then(() => {
        parent.chat("Finished");
        //process.kill();
      });
      parent.chat("Arrived");
      //process.run();
    } else {
      data.removeProcess("mine");
    }
  }, () => {
    data.client.pathfinder.stop();
  }));

  const position = findBlock(data.client, name);

  if (position) {

  } else {
    parent.chat(`Could not find any ${name}`);
  }
}

function findBlock (bot: mineflayer.Bot, name: string): Vec3 {
  return bot.findBlocks({
    point: bot.entity.position,
    matching (block) {
      if (block.name === name) {
        return true;
      } else {
        return false;
      }
    },
    maxDistance: 128,
    count: 1
  })[0];
}
