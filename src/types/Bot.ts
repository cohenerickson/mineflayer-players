import mineflayer from "mineflayer";
import BotProcess from "../util/BotProcess";

export default interface Bot {
  bot: mineflayer.Bot;
  processes: Map<string, BotProcess>;
}
