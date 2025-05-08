import "./styles.scss";

const canvas = document.getElementById("canvas");
if (!canvas) {
  throw new Error("Canvas element not found");
}
if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error("Element is not a canvas");
}
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
