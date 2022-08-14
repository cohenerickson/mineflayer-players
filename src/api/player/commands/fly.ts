import mineflayer from "mineflayer";
import bots from "../util/bots";
import Bot from "../util/Bot";
import BotProcess from "../util/BotProcess";
import parsePos from "../util/parsePosition";
import { Vec3 } from "vec3";

const FLYING_SPEED = 0.5;

export function Fly (parent: mineflayer.Bot, username: string, args: string[]): void {
  const subCommand = args[0];
  if (!bots.has(username) || username === parent.username) {
    parent.chat(`Child '${username}' does not exist.`);
    return;
  }

  const data = bots.get(username) as Bot;
  const bot = data.client;

  switch (subCommand) {
    case "start":
      data.addProcess("fly", new BotProcess(() => {
        bot.creative.startFlying();
      }, () => {
        bot.creative.stopFlying();
      }));
      break;
    case "stop":
      data.removeProcess("fly");
      break;
    case "to":
      if (args.slice(1).length === 2) {
        const [x, z] = args.slice(1);
        if ([x, z].some(x => isNaN(parsePos(x)))) {
          parent.chat(`Invalid coordinates.`);
          return;
        }
        data.addProcess("fly", new BotProcess(() => {
          bot.creative.flyTo(new Vec3(
            parsePos(x, bot.entity.position.x),
            bot.entity.position.y,
            parsePos(z, bot.entity.position.z)
          ));
        }, () => {
          bot.creative.stopFlying();
        }));
      } else if (args.slice(1).length === 3) {
        const [x, y, z] = args.slice(1);
        if ([x, y, z].some(x => isNaN(parsePos(x)))) {
          parent.chat(`Invalid coordinates.`);
          return;
        }
        const destination = new Vec3(
          parsePos(x, bot.entity.position.x),
          parsePos(y, bot.entity.position.y, true),
          parsePos(z, bot.entity.position.z)
        );
        
        let vector = destination.minus(bot.entity.position);
        let magnitude = vecMagnitude(vector);

        bot.creative.startFlying();

        // https://github.com/PrismarineJS/mineflayer/blob/3b9243bd2934f32fcac371e646f7064bd7c51cd6/lib/plugins/creative.js#L50
        data.addProcess("fly", new BotProcess((process, vector, magnitude) => {
          if (magnitude > FLYING_SPEED) {
            bot.physics.gravity = 0;
            bot.entity.velocity = new Vec3(0, 0, 0);
  
            const normalizedVector = vector.scaled(1 / magnitude)
            bot.entity.position.add(normalizedVector.scaled(FLYING_SPEED));
  
            bot.waitForTicks(1).then(() => {
              vector = destination.minus(bot.entity.position);
              magnitude = vecMagnitude(vector);

              process.run(vector, magnitude);
            });
          }
        }, () => {
          bot.creative.stopFlying();
        }, vector, magnitude));

      } else {
        parent.chat(`Invalid coordinates.`);
        return;
      }
      break;
    default:
      parent.chat(`Invalid sub-command: ${subCommand}`);
      break;
  }
}

// https://github.com/PrismarineJS/mineflayer/blob/3b9243bd2934f32fcac371e646f7064bd7c51cd6/lib/plugins/creative.js#L87
function vecMagnitude (vec: Vec3) {
  return Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z)
}
