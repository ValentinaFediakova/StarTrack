import "./styles.scss";

import { StarField } from "./utils/StarsField";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
if (!canvas) {
  throw new Error("Canvas element not found");
}
if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error("Element is not a canvas");
}

const resize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

window.addEventListener("resize", resize);
resize();

const controls = document.getElementById("controls");
const controlsButtonToggle = document.getElementById("controlsButtonToggle");

controlsButtonToggle?.addEventListener("click", () => {
  if (controls && controls.classList.contains("controls_disappear")) {
    controls.classList.remove("controls_disappear");
    controlsButtonToggle.classList.remove(
      "controls__button-toggle_controls-disappear"
    );
  } else {
    if (controls) {
      controls.classList.add("controls_disappear");
      controlsButtonToggle.classList.add(
        "controls__button-toggle_controls-disappear"
      );
    }
  }
});

const starsCountInput = document.getElementById(
  "starsCount"
) as HTMLInputElement;

const starsColorInput = document.getElementById(
  "starsColor"
) as HTMLInputElement;

const starsSpeedInput = document.getElementById(
  "starsSpeed"
) as HTMLInputElement;

const orbitModeButton = document.getElementById("orbitMode");

const towardsViewerModeButton = document.getElementById("towardsViewerMode");

const skyColorInput = document.getElementById("skyColor") as HTMLInputElement;

const field = new StarField(canvas);
field.start();

starsCountInput.addEventListener("change", () => {
  field.updateStarCount(Number(starsCountInput.value));
});

starsColorInput.addEventListener("input", () => {
  field.updateStarColor(starsColorInput.value);
});

skyColorInput.addEventListener("input", () => {
  field.updateBgColor(skyColorInput.value);
});

starsSpeedInput.addEventListener("change", () => {
  field.updateSpeedStars(Number(starsSpeedInput.value));
});

orbitModeButton?.addEventListener("click", () => {
  field.updateMode("orbit");
  towardsViewerModeButton?.classList.remove("controls__button_active");
  orbitModeButton.classList.add("controls__button_active");
});

towardsViewerModeButton?.addEventListener("click", () => {
  field.updateMode("towardsViewer");
  orbitModeButton?.classList.remove("controls__button_active");
  towardsViewerModeButton.classList.add("controls__button_active");
});
