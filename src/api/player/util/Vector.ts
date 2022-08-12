export default class Vector {
  x: number = 0;
  y: number = 0;
  constructor (x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  distanceTo (other: Vector): number {
    return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
  }
}
