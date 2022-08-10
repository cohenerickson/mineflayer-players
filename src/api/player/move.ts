import mineflayer from "mineflayer";
import { Movements, goals } from "mineflayer-pathfinder";
import mcData from "minecraft-data";
import bots from "../../util/bots";
import Bot from "../../util/Bot";
import BotProcess from "../../util/BotProcess";

export function Move (parent: mineflayer.Bot, username: string, args: string[]): void {
  const direction = args[0];

  if (!bots.has(username) || username === parent.username) {
    parent.chat(`Child '${username}' does not exist.`);
    return;
  }

  const bot = bots.get(username) as Bot;

  let run;

  switch (direction) {
    case "forward":
    case "forwards":
      run = () => {
        bot.client.setControlState("forward", true);
      }
      break;
    case "back":
    case "backward":
    case "backwards":
      run = () => {
        bot.client.setControlState("back", true);
      }
      break;
    // for some reason right and left are switched
    case "left":
      run = () => {
        bot.client.setControlState("right", true);
      }
      break;
    case "right":
      run = () => {
        bot.client.setControlState("left", true);
      }
      break;
    // FIXME: this causes random crashes; see https://github.com/PrismarineJS/mineflayer-pathfinder/issues/285
    // case "to":
    //   let goal: goals.Goal | null;
    //   const defaultMove = new Movements(bot.client, mcData(bot.client.version))
    //   if (args.slice(1).length === 2) {
    //     const [x, z] = args.slice(1);
    //     if ([x, z].some(x => isNaN(parseInt(x)))) {
    //       parent.chat(`Invalid coordinates.`);
    //       return;
    //     }
    //     goal = new goals.GoalXZ(parseInt(x), parseInt(z));
    //   } else if (args.slice(1).length === 3) {
    //     const [x, y, z] = args.slice(1);
    //     if ([x, y, z].some(x => isNaN(parseInt(x)))) {
    //       parent.chat(`Invalid coordinates.`);
    //       return;
    //     }
    //     goal = new goals.GoalBlock(parseInt(x), parseInt(y), parseInt(z));
    //   } else {
    //     parent.chat(`Invalid coordinates.`);
    //     return;
    //   }
    //   run = async (process: BotProcess) => {
    //     bot.client.pathfinder.setMovements(defaultMove);
    //     if (bot.client.pathfinder.isMoving()) {
    //       bot.client.pathfinder.stop();
    //     }
    //     bot.client.pathfinder.setGoal(goal, false);
    //   }
    //   break;
    default:
      parent.chat(`Invalid direction: ${direction}`);
      break;
  }

  if (run) {
    bot.addProcess("move", new BotProcess(
      run,
      () => {
        bot.client.setControlState("forward", false);
        bot.client.setControlState("back", false);
        bot.client.setControlState("left", false);
        bot.client.setControlState("right", false);
        bot.client.pathfinder.stop();
      }
    ));
  }
}
