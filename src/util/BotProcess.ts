type Function = (...args: any[]) => any;

export default class BotProcess {
  closed: boolean = false;
  #run: Function;
  #kill?: Function;

  constructor (run: Function, kill?: Function, ...args: any[]) {
    this.#run = run;
    this.#kill = kill;
    this.run(...args);
  }

  kill () {
    this.closed = true;
    if (this.#kill) this.#kill(this);
  }

  run (...args: any[]) {
    if (!this.closed) return this.#run(this, ...args);
  }
}
