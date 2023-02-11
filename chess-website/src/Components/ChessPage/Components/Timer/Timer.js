class Timer{

    constructor(color, time, updateCallback){
        this.color = color;
        this.time = time;
        this.enabled = false;
        this.intervalId = null;
        this.updateCallback = updateCallback;
    }

    enable(){
        if (this.enabled){
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
        }, 100);
    }
    
    disable(){
        clearInterval(this.intervalId);
        this.enabled = false;
        this.updateCallback();
    }
}

export default Timer;