import "./styles.scss";

import { StarField } from "./utils/StarsField";

const canvas = document.getElementById("canvas");
if (!canvas) {
  throw new Error("Canvas element not found");
}
if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error("Element is not a canvas");
}

const ctx = canvas.getContext("2d");

const resize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

window.addEventListener("resize", resize);
resize();

const field = new StarField();
const starStamp = field.getStarStamp();

starStamp.style.position = "absolute";
starStamp.style.top = "10px";
starStamp.style.left = "10px";

document.body.appendChild(starStamp);
