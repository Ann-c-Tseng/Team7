/**
 * The timer to keep track of the game time on each person's turn
 * includes functions to control the timer
 */
class Timer {
  /**
   * @constructor
   * @param {string} color - the color of the timer, either 'b' or 'w'.
   * @param {func} updateCallback - the function to call each time the timer
   * updates.
   * @param {func} finishedCallback - the function to call when the timer is out
   * of time.
   */
  constructor(color, updateCallback, finishedCallback) {
    this.color = color;
    this.time = undefined;
    this.enabled = false;
    this.intervalId = null;
    this.updateCallback = updateCallback;
    this.finishedCallback = finishedCallback;
  }

  /**
   * Enables the timer if it was disabled and has time left
   */
  enable() {
    if (this.enabled || !this.timeLeft()) {
      return;
    }

    let start = Date.now();
    this.enabled = true;
    this.intervalId = setInterval(() => {
      const now = Date.now();
      const diff = now - start;
      this.time -= diff;
      start = now;

      this.updateCallback();
      if (!this.timeLeft()) {
        this.finish();
      }
    }, 100);
  }

  /**
   * Returns whether there is time left or not
   * @return {bool}
   */
  timeLeft() {
    return this.time > 0;
  }

  /**
   * This is called when time runs out.
   */
  finish() {
    this.finishedCallback(this.color);
    this.time = 0;
    this.disable();
  }

  /**
   * This is called to disable the timer.
   */
  disable() {
    clearInterval(this.intervalId);
    this.enabled = false;
    this.updateCallback();
  }
}

export default Timer;
