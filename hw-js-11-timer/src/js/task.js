const refs = {
    startBtn: document.querySelector('button[data-action="start"]'),
    stopBtn: document.querySelector('button[data-action="stop"]'),
    days: document.querySelector('span[data-value="days"]'),
    hours: document.querySelector('span[data-value="hours"]'),
    mins: document.querySelector('span[data-value="mins"]'),
    secs: document.querySelector('span[data-value="secs"]'),
  };
  
  const countdownTimer = {
    intervalId: null,
    isActive: false,
    start() {
      if (this.isActive) {
        return;
      }
  
      this.isActive = true;
      const targetDate = new Date('Jul 17, 2020');
  
      const startCurentTime = Date.now();
      let startDeltaTime = targetDate - startCurentTime;
  
      updateTime(startDeltaTime);
  
      this.intervalId = setInterval(() => {
        const curentTime = Date.now();
        let deltaTime = targetDate - curentTime;
  
        updateTime(deltaTime);
      }, 1000);
    },
  
    stop() {
      clearInterval(this.intervalId);
      this.intervalId = null;
      updateTime(0);
      this.isActive = false;
    },
  };
  
  refs.startBtn.addEventListener(
    'click',
    countdownTimer.start.bind(countdownTimer),
  );
  refs.stopBtn.addEventListener(
    'click',
    countdownTimer.stop.bind(countdownTimer),
  );
  
  function updateTime(time) {
    const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  
    const hours = pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  
    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  
    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
  
    refs.days.textContent = `${days} :`;
    refs.hours.textContent = `${hours} :`;
    refs.mins.textContent = `${mins} :`;
    refs.secs.textContent = `${secs}`;
  }
  
  function pad(value) {
    return String(value).padStart(2, '0');
  }
  