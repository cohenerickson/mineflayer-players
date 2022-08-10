import mineflayer from "mineflayer";

export function TPS (parent: mineflayer.Bot, rawArguments: string[]): void {
  parent.chat(`TPS: ${(parent as any).getTps()}`);
}
