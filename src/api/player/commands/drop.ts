import mineflayer from "mineflayer";
import bots from "../util/bots";
import Bot from "../util/Bot";

export async function Drop (parent: mineflayer.Bot, username: string, args: string[]): Promise<void> {
  const subCommand = args[0];
  if (!bots.has(username) || username === parent.username) {
    parent.chat(`Child '${username}' does not exist.`);
    return;
  }

  const data = bots.get(username) as Bot;
  const bot = data.client;

  switch (subCommand) {
    case "stack":
      if (bot.heldItem) bot.tossStack(bot.heldItem);
      break;
    default:
      let amount = 1;
      if (parseInt(args[1])) amount = parseInt(args[1]);
      let item = bot.heldItem;
      let count = item?.count as number;
      if (item) {
        await bot.toss(item.type, null, amount);
        if (count - amount > 0) {
          bot.equip(item.type, null);
        }
      }
      break;
  }
}
