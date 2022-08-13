import mineflayer from "mineflayer";
import bots from "../util/bots";
import Bot from "../util/Bot";
import { Vec3 } from "vec3";

export function Look (parent: mineflayer.Bot, username: string, args: string[]): void {
  if (!bots.has(username) || username === parent.username) {
    parent.chat(`Child '${username}' does not exist.`);
    return;
  }

  const bot = bots.get(username) as Bot;

  if (args.length === 2) {
    const [ pitch, yaw ] = args;
    if ([pitch, yaw].some(x => isNaN(parseFloat(x)))) {
      parent.chat(`Invalid pitch or yaw: ${pitch}, ${yaw}`);
      return;
    }
    bot.client.look(-(parseFloat(pitch)+180)*Math.PI/180, -parseFloat(yaw)*Math.PI/180, true);
  } else if (args.length === 3) {
    const [ x, y, z ] = args;
    if ([x, y, z].some(x => isNaN(parseFloat(x)))) {
      parent.chat(`Invalid x, y, or z: ${x}, ${y}, ${z}`);
      return;
    }
    bot.client.lookAt(new Vec3(parseFloat(x), parseFloat(y), parseFloat(z)), true);
  }
}
