import mineflayer from "mineflayer";
import Vector from "../util/Vector";
import { Vec3 } from "vec3";

export function Distance (parent: mineflayer.Bot, rawArguments: string[]): void {
  for (let arg in rawArguments) {
    if (parseFloat(rawArguments[arg]) === NaN) {
      parent.chat("Usage: /distance <x> <y> <?z> <x> <y> <?z>");
      return;
    }
  }

  if (rawArguments.length === 4) {
    const [x1, y1, x2, y2] = rawArguments;
    const v1 = new Vector(parseFloat(x1), parseFloat(y1));
    const v2 = new Vector(parseFloat(x2), parseFloat(y2));

    parent.chat(`Distance: ${parseFloat(v1.distanceTo(v2).toFixed(2))}`);
    return;
  }

  if (rawArguments.length === 6) {
    const [x1, y1, z1, x2, y2, z2] = rawArguments;
    const v1 = new Vec3(parseFloat(x1), parseFloat(y1), parseFloat(z1));
    const v2 = new Vec3(parseFloat(x2), parseFloat(y2), parseFloat(z2));

    parent.chat(`Distance: ${parseFloat(v1.distanceTo(v2).toFixed(2))}`);
    return;
  }

  parent.chat("Usage: /distance <x> <y> <?z> <x> <y> <?z>");
}
