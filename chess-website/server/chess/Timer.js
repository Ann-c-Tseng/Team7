/**
 * The timer module contains a timer class which can be used to
 * keep track of time like a timer.
 * @module Timer
 * @public
 */
class Timer {
  /**
   * This callback is a function for the timer to call when it runs out of time.
   * @callback timerCallback
   */

  /**
   * Create a timer with given parameters.
   * @param {string} color - The color, either 'w' or 'b',
   * for white or black respectively.
   * @param {int} time - An int representing the timer length in ms.
   * @param {timerCallback} finishedCallback - What the timer
   * calls when it's finished.
   * @public
   */
  constructor(color, time, finishedCallback) {
    this.color = color;
    this.time = time;
    this.enabled = false;
    this.intervalId = null;
    this.finishedCallback = finishedCallback;
  }
  /**
  * Starts the timer if it was disabled.
  * @public
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

      if (!this.timeLeft()) {
        this.finish();
      }
    }, 100);
  }
  /**
  * Disables the timer if it was enabled.
  * @public
  */
  disable() {
    clearInterval(this.intervalId);
    this.enabled = false;
  }
  /**
  * Toggles the timer from enabled to disabled, or vice versa.
  * @public
  */
  toggle() {
    if (this.enabled) {
      this.disable();
    } else {
      this.enable();
    }
  }
  /**
  * Returns true if there is time left, false otherwise.
  * @return {boolean}
  * @public
  */
  timeLeft() {
    return this.time > 0;
  }
  /**
   * A function used internally when time is up.
   * @private
   */
  finish() {
    this.finishedCallback(this.color);
    this.disable();
    this.time = 0;
  }
}

module.exports = Timer;
