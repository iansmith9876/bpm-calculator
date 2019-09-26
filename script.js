let beats = 0;
let tapToggle = 0;
let firstTap, previousTime;
let lastTap = null;

const beatInput = document.getElementById("beat-input");

const recordBeat = function() {
  tapDate = new Date;
  tapTime = tapDate.getTime();
  beatInput.classList.add("active");

  if ((tapTime - previousTime) > 1500) {
    tapToggle = 0;
    beats = 0;
    lastTap = null;
    previousTime = tapTime;
  };

  if (tapToggle === 0) {
    firstTap = tapTime;
    tapToggle = 1;
  } else {
    previousTime = tapTime;
    lastTap = tapTime;
  };

  beats += 1;
  document.getElementById("bpm").textContent = calculateBpm();
  setTimeout(function (){
    beatInput.classList.remove("active");
  }, 150);
};

const calculateBpm = function() {
  if (typeof(lastTap) === null) { return 0 };

  let bpm = Math.round(60000 * beats / (lastTap - firstTap));
  return bpm;
};

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') { recordBeat() };
});

beatInput.addEventListener('touchstart', () => {
  recordBeat();
});
