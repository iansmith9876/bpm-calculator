let beats = 0;
let tapToggle = 0;
let firstTap, previousTime;
let lastTap = null;
let bpmHistory = [];
const HISTORY_SIZE = 4;

const beatInput = document.getElementById("beat-input");

const recordBeat = function() {
  const tapTime = performance.now();
  beatInput.classList.add("active");

  if ((tapTime - previousTime) > 1500) {
    tapToggle = 0;
    beats = 0;
    lastTap = null;
    previousTime = tapTime;
    bpmHistory = [];
  }

  if (tapToggle === 0) {
    firstTap = tapTime;
    tapToggle = 1;
  } else {
    previousTime = tapTime;
    lastTap = tapTime;
  }

  beats += 1;
  const bpmDisplay = document.getElementById("bpm");
  const bpmValue = calculateBpm();
  bpmDisplay.textContent = bpmValue;
  
  if (beats < 4) {
    bpmDisplay.classList.add('gathering');
  } else {
    bpmDisplay.classList.remove('gathering');
  }

  setTimeout(function (){
    beatInput.classList.remove("active");
  }, 150);
};

const calculateBpm = function() {
  if (lastTap === null || beats < 4) {
    return '--';
  }

  let currentBpm = Math.round(60000 * (beats - 1) / (lastTap - firstTap));
  
  if (currentBpm >= 30 && currentBpm <= 300) {
    bpmHistory.push(currentBpm);
    if (bpmHistory.length > HISTORY_SIZE) {
      bpmHistory.shift();
    }
  }

  if (bpmHistory.length > 0) {
    const averageBpm = Math.round(
      bpmHistory.reduce((sum, bpm) => sum + bpm, 0) / bpmHistory.length
    );
    return averageBpm;
  }

  return '--';
};

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    recordBeat();
  }
});

beatInput.addEventListener('touchstart', () => {
  recordBeat();
});

beatInput.addEventListener('mousedown', () => {
  recordBeat();
});
