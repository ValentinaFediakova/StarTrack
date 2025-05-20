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

const starsCountInput = document.getElementById(
  "starsCount"
) as HTMLInputElement;

const starsColorInput = document.getElementById(
  "starsColor"
) as HTMLInputElement;

const starsSpeedInput = document.getElementById(
  "starsSpeed"
) as HTMLInputElement;

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
