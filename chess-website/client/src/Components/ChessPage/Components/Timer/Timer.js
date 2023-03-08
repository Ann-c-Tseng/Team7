class Timer{

    constructor(color, updateCallback, finishedCallback){
        this.color = color;
        this.time = undefined;
        this.enabled = false;
        this.intervalId = null;
        this.updateCallback = updateCallback;
        this.finishedCallback = finishedCallback;
    }

    enable(){
        if (this.enabled || !this.timeLeft()){
            return;
        }

        let start = Date.now()
        this.enabled = true;
        this.intervalId = setInterval(() => {
            const now = Date.now()
            const diff = now - start;
            this.time -= diff;
            start = now;

            this.updateCallback();
            if (!this.timeLeft()){
                this.finish();
            }

        }, 100);
    }

    timeLeft(){
        return this.time > 0;
    }

    finish(){
        this.finishedCallback(this.color);
        this.time = 0;
        this.disable();
    }


    disable(){
        clearInterval(this.intervalId);
        this.enabled = false;
        this.updateCallback();
    }
}

export default Timer;