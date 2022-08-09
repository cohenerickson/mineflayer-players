import * as config from "../config.json";

export default function debug (...args: any[]) {
  if (config.debug) console.log(...args);
}
