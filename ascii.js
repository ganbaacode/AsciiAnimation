import ANIMATIONS from "./animations.js";

window.onload = () => {
  "use strict";
  callOnWindowLoad();
};

function callOnWindowLoad() {
  "use strict";
  const startBtn = document.getElementById("start");
  const stopBtn = document.getElementById("stop");
  const animationBtn = document.getElementById("animation");
  const fontsizeBtn = document.getElementById("fontsize");
  const turboBtn = document.getElementById("turbo");
  const textArea = document.getElementById("text-area");

  /* default textArea font-size */
  textArea.style.fontSize = "medium";

  /* Animation Type Event Listener */
  animationBtn.addEventListener("change", setAnimationType);

  /* Start Animation Event Listener */
  startBtn.addEventListener("click", startAnimation);

  /* Stop Animation Event Listener */
  stopBtn.addEventListener("click", stopAnimation);

  /* Turbo Event Listener */
  turboBtn.addEventListener("change", setUnsetTurbo);

  /* Set Text Size */
  fontsizeBtn.addEventListener("change", setTextSize);

  let animationType = animationBtn.value; // default animation type is Blank

  function setAnimationType(e) {
    animationType = e.target.value;
  }

  let animationTimerID;
  let frameSpeed = 250; // default frame speed
  let currentFrame = 0;

  function startAnimation() {
    animationTimerID = setInterval(animationFunc, `${frameSpeed}`);
    startBtn.disabled = true;
    stopBtn.disabled = false;
    animationBtn.disabled = true; // prevent user from changing animation during  some ongoing animation
  }

  function animationFunc() {
    if (animationType) {
      let animationArr = ANIMATIONS[`${animationType}`].split("=====\n");
      const animationFrameCount = animationArr.length;
      textArea.value = animationArr[currentFrame];
      currentFrame =
        currentFrame == animationFrameCount - 1 ? 0 : ++currentFrame;
    }
  }

  function stopAnimation() {
    clearInterval(animationTimerID);
    animationTimerID = undefined;
    textArea.value = "";
    startBtn.disabled = false;
    stopBtn.disabled = true;
    animationBtn.disabled = false;
    turboBtn.checked = false;
    animationType = undefined;
    animationBtn[0].selected = true; // first option in animationBtn select box
    fontsizeBtn[2].selected = true; //  third option in fontsizeBtn select box
  }

  function setUnsetTurbo() {
    frameSpeed = turboBtn.checked ? 50 : 250; // turbo frame speed is 50 ms
    if (animationTimerID) {
      clearInterval(animationTimerID);
      animationTimerID = setInterval(animationFunc, `${frameSpeed}`);
    }
  }

  function setTextSize(e) {
    textArea.style.fontSize = `${e.target.value}`;
  }
}