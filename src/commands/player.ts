import mineflayer from "mineflayer";
import * as API from "../api/player/index";

export function Player (parent: mineflayer.Bot, rawArguments: string[]): void {
  const command = rawArguments[1];
  const username = rawArguments[0];
  const args = rawArguments.slice(2);
  if (command === "spawn") {
    API.Spawn(parent, username, args);
  } else if (command === "kill") {
    API.Kill(parent, username, args);
  } else if (command === "move") {
    API.Move(parent, username, args);
  } else if (command === "sneak") {
    API.Sneak(parent, username, args);
  } else if (command === "unsneak") {
    API.Unsneak(parent, username, args);
  } else if (command === "stop") {
    API.Stop(parent, username, args);
  } else if (command === "jump") {
    API.Jump(parent, username, args);
  } else if (command === "attack") {
    API.Attack(parent, username, args);
  } else if (command === "mount") {
    API.Mount(parent, username, args);
  } else if (command === "dismount") {
    API.Dismount(parent, username, args);
  } else if (command === "sprint") {
    API.Sprint(parent, username, args);
  } else if (command === "unsprint") {
    API.Unsprint(parent, username, args);
  } else if (command === "use") {
    API.Use(parent, username, args);
  } else if (command === "drop") {
    API.Drop(parent, username, args);
  } else if (command === "eat") {
    API.Eat(parent, username, args);
  } else if (command === "say") {
    API.Say(parent, username, args);
  } else if (command === "mine") {
  //  API.Mine(parent, username, args);
  } else if (command === "look") {
    API.Look(parent, username, args);
  } else if (command === "fly") {
    API.Fly(parent, username, args);
  } else if (command === "teleport") {
    API.Teleport(parent, username, args);
  }
}
