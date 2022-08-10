import mineflayer from "mineflayer";
import mineflayerTps from "mineflayer-tps";
import * as Commands from "./commands/index";
import bots from "./util/bots";
import Discord from "./api/discord/index";
import dotenv from "dotenv";
dotenv.config();

const parent: any = mineflayer.createBot({
  host: process.env.MC_HOST as string,
  port: parseInt(process.env.MC_PORT as string) as number,
  username: process.env.MC_USERNAME as string
});

parent.loadPlugin(mineflayerTps(mineflayer));

const prefix = process.env.MC_PREFIX as string;

Discord(parent);

bots.set(parent.username, parent);

parent.on("chat", (username: string, message: string, translate: string | null, jsonMsg: { [key: string]: any }, matches: string[] | null): void => {
  if (username === parent.username) return;
  console.log(message);
  if (message.startsWith(prefix)) {
    const command = message.substring(prefix.length).split(" ")[0];
    const rawArguments = message.substring(prefix.length).split(" ").slice(1);

    if (command === "player") {
      Commands.Player(parent, rawArguments);
    } else if (command === "distance") {
      Commands.Distance(parent, rawArguments);
    } else if (command === "tps") {
      Commands.TPS(parent, rawArguments);
    }
  }
});
