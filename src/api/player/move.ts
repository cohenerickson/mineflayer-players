import mineflayer from "mineflayer";
import bots from "../../util/bots";
import Bot from "../../util/Bot";
import BotProcess from "../../util/BotProcess";

export function Move (parent: mineflayer.Bot, username: string, direction: string): void {
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
      }
    ));
  }
}
