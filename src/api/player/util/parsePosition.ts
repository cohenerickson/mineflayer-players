export default function parsePos (pos: string, current: number = 0, isY: boolean = false): any {
  if (/^~[+-]?([0-9]+)?$/.test(pos)) {
    return current + parseFloat(pos.slice(1) || "0");
  } else if (!isNaN(parseFloat(pos))) {
    return parseFloat(pos) + (isY ? 0 : 0.5);
  } else {
    return undefined;
  }
}
