import mineflayer from "mineflayer";
import bots from "../util/bots";
import Bot from "../types/Bot";
import BotProcess from "../util/BotProcess";

export function Move (parent: mineflayer.Bot, username: string, direction: string): void {
  if (!bots.has(username) || username === parent.username) {
    parent.chat(`Child '${username}' does not exist.`);
    return;
  }

  const data = bots.get(username) as Bot;
  const bot: mineflayer.Bot = data.bot;

  let run;

  switch (direction) {
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
    case "left":
      run = () => {
        bot.setControlState("left", true);
      }
      break;
    case "right":
      run = () => {
        bot.setControlState("right", true);
      }
      break;
    default:
      parent.chat(`Invalid direction: ${direction}`);
      break;
  }

  if (run) {
    // Kill existing process
    if (data.processes.has("move")) (data.processes.get("move") as BotProcess).kill();
    // Spawn new process
    data.processes.set("move", new BotProcess(
      run,
      () => {
        bot.setControlState("forward", false);
        bot.setControlState("back", false);
        bot.setControlState("left", false);
        bot.setControlState("right", false);
      }
    ));
  }
}
