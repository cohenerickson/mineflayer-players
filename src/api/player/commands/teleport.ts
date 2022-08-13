import mineflayer from "mineflayer";
import bots from "../util/bots";
import Bot from "../util/Bot";
import { Vec3 } from "vec3";

export function Teleport (parent: mineflayer.Bot, username: string, args: string[]): void {
  const method = args[0];
  if (!bots.has(username) || username === parent.username) {
    parent.chat(`Child '${username}' does not exist.`);
    return;
  }

  const data = bots.get(username) as Bot;
  const bot = data.client;

  switch (method) {
    case "to":
      if (args.slice(1).length === 2) {
        const [x, z] = args.slice(1);
        if ([x, z].some(x => isNaN(parsePos(x)))) {
          parent.chat(`Invalid coordinates.`);
          return;
        }
        bot.entity.position = new Vec3(
          parsePos(x, bot.entity.position.x),
          bot.entity.position.y,
          parsePos(z, bot.entity.position.z)
        );
      } else if (args.slice(1).length === 3) {
        const [x, y, z] = args.slice(1);
        if ([x, y, z].some(x => isNaN(parsePos(x)))) {
          parent.chat(`Invalid coordinates.`);
          return;
        }
        bot.entity.position = new Vec3(
          parsePos(x, bot.entity.position.x),
          parsePos(y, bot.entity.position.y, true),
          parsePos(z, bot.entity.position.z)
        );
      } else {
        parent.chat(`Invalid coordinates.`);
        return;
      }
      break;
    default:
      parent.chat(`Invalid method: ${method}`);
      break;
  }

  //bot.entity.position = new Vec3(10, 64, 10);
}

function parsePos (pos: string, current: number = 0, isY: boolean = false): any {
  if (/^~[+-]?([0-9]+)?$/.test(pos)) {
    return current + parseFloat(pos.slice(1) || "0");
  } else if (!isNaN(parseFloat(pos))) {
    return parseFloat(pos) + (isY ? 0 : 0.5);
  } else {
    return undefined;
  }
}
