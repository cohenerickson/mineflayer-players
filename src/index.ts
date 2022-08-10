import mineflayer from "mineflayer";
import * as config from "../config.json";
import * as API from "./api/index";
import bots from "./util/bots";

const parent: any = mineflayer.createBot({
  host: config.host,
  port: config.port,
  username: config.username
});

bots.set(parent.username, parent);

parent.on("chat", (username: string, message: string, translate: string | null, jsonMsg: { [key: string]: any }, matches: string[] | null): void => {
  if (username === parent.username) return;
  if (message.startsWith(config.prefix)) {
    const command = message.substring(config.prefix.length).split(" ")[0];
    const rawArguments = message.substring(config.prefix.length).split(" ").slice(1);

    if (command === "player") {
      if (rawArguments[1] === "spawn") {
        API.Spawn(parent, rawArguments[0]);
      } else if (rawArguments[1] === "kill") {
        API.Kill(parent, rawArguments[0]);
      } else if (rawArguments[1] === "move") {
        API.Move(parent, rawArguments[0], rawArguments[2]);
      } else if (rawArguments[1] === "sneak") {
        API.Sneak(parent, rawArguments[0]);
      } else if (rawArguments[1] === "unsneak") {
        API.Unsneak(parent, rawArguments[0]);
      } else if (rawArguments[1] === "stop") {
        API.Stop(parent, rawArguments[0]);
      } else if (rawArguments[1] === "jump") {
        API.Jump(parent, rawArguments[0], rawArguments[2], rawArguments[3]);
      } else if (rawArguments[1] === "attack") {
        API.Attack(parent, rawArguments[0], rawArguments[2], rawArguments[3]);
      } else if (rawArguments[1] === "mount") {
        API.Mount(parent, rawArguments[0]);
      } else if (rawArguments[1] === "dismount") {
        API.Dismount(parent, rawArguments[0]);
      } else if (rawArguments[1] === "sprint") {
        API.Sprint(parent, rawArguments[0]);
      } else if (rawArguments[1] === "unsprint") {
        API.Unsprint(parent, rawArguments[0]);
      } else if (rawArguments[1] === "use") {
        API.Use(parent, rawArguments[0], rawArguments[2], rawArguments[3]);
      } else if (rawArguments[1] === "drop") {
        API.Drop(parent, rawArguments[0]);
      } else if (rawArguments[1] === "dropstack") {
        API.Dropstack(parent, rawArguments[0]);
      }
    }
  }
});
