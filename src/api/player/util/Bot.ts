import mineflayer from "mineflayer";
import BotProcess from "./BotProcess";

export default class Bot {
  client: mineflayer.Bot;
  processes: Map<string, BotProcess>;
  constructor (bot: mineflayer.Bot) {
    this.client = bot;
    this.processes = new Map();
  }

  addProcess (name: string, process: BotProcess) {
    if (this.processes.has(name)) (this.processes.get(name) as BotProcess).kill();
    this.processes.set(name, process);
  }

  removeProcess (name: string) {
    let process = this.processes.get(name);
    if (process) {
      process.kill();
      this.processes.delete(name);
    }
  }

  clearProcesses () {
    this.processes.forEach((process: BotProcess, index: any) => {
      process.kill();
      this.processes.delete(index);
    });
  }
}
