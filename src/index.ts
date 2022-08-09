import mineflayer from "mineflayer";
import * as config from "../config.json";
import * as API from "./api/index";
import bots from "./bots";

const parent: any = mineflayer.createBot({
  host: config.host,
  port: config.port,
  username: "parent"
});

bots.set("parent", parent);

parent.on("chat", (username: string, message: string, translate: string | null, jsonMsg: { [key: string]: any }, matches: string[] | null): void => {
  if (message.startsWith(config.prefix)) {
    const command = message.substring(config.prefix.length).split(" ")[0];
    const rawArguments = message.substring(config.prefix.length).split(" ").slice(1);

    if (command === "spawn") {
      API.Spawn(parent, rawArguments[0]);
    }
  }
});
