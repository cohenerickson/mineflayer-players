import mineflayer from "mineflayer";
import { Movements, goals } from "mineflayer-pathfinder";
import mcData from "minecraft-data";
import bots from "../util/bots";
import Bot from "../util/Bot";
import BotProcess from "../util/BotProcess";
import parsePos from "../util/parsePosition";

export function Move (parent: mineflayer.Bot, username: string, args: string[]): void {
  const subCommand = args[0];

  if (!bots.has(username) || username === parent.username) {
    parent.chat(`Child '${username}' does not exist.`);
    return;
  }

  const data = bots.get(username) as Bot;
  const bot = data.client;

  let run;

  switch (subCommand) {
    case "forward":
    case "forwards":
      run = () => {
        bot.setControlState("forward", true);
      }
      break;
    case "back":
    case "backward":
    case "backwards":
      run = () => {
        bot.setControlState("back", true);
      }
      break;
    // for some reason right and left are switched
    case "left":
      run = () => {
        bot.setControlState("right", true);
      }
      break;
    case "right":
      run = () => {
        bot.setControlState("left", true);
      }
      break;
    // FIXED: this causes random crashes; see https://github.com/PrismarineJS/mineflayer-pathfinder/issues/285
    case "to":
      let goal: goals.Goal | null;
      const defaultMove = new Movements(bot, mcData(bot.version))
      if (args.slice(1).length === 2) {
        const [x, z] = args.slice(1);
        if ([x, z].some(x => isNaN(parsePos(x)))) {
          parent.chat(`Invalid coordinates.`);
          return;
        }
        goal = new goals.GoalXZ(
          parsePos(x, bot.entity.position.x),
          parsePos(z, bot.entity.position.z)
        );
      } else if (args.slice(1).length === 3) {
        const [x, y, z] = args.slice(1);
        if ([x, y, z].some(x => isNaN(parsePos(x)))) {
          parent.chat(`Invalid coordinates.`);
          return;
        }
        goal = new goals.GoalBlock(
          parsePos(x, bot.entity.position.x),
          parsePos(y, bot.entity.position.z, true),
          parsePos(z, bot.entity.position.z)
        );
      } else {
        parent.chat(`Invalid coordinates.`);
        return;
      }
      run = async (process: BotProcess) => {
        bot.pathfinder.stop();
        bot.pathfinder.setMovements(defaultMove);
        bot.pathfinder.setGoal(goal, false);
      }
      break;
    default:
      parent.chat(`Invalid sub-command: ${subCommand}`);
      break;
  }

  if (run) {
    data.addProcess("move", new BotProcess(
      run,
      () => {
        bot.setControlState("forward", false);
        bot.setControlState("back", false);
        bot.setControlState("left", false);
        bot.setControlState("right", false);
        bot.pathfinder.stop();
      }
    ));
  }
}
