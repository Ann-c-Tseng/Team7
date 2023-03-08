class Timer{

    constructor(color, time, finishedCallback){
        this.color = color;
        this.time = time;
        this.enabled = false;
        this.intervalId = null;
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

            if (!this.timeLeft()){
                this.finish();
            }

        }, 100);
    }

    disable(){
        clearInterval(this.intervalId);
        this.enabled = false;
    }

    toggle(){
        if (this.enabled){
            this.disable();
        }
        else{
            this.enable();
        }
    }
    
    timeLeft(){
        return this.time > 0;
    }

    finish(){
        this.finishedCallback(this.color);
        this.disable();
        this.time = 0;
    }
}

module.exports = Timer;