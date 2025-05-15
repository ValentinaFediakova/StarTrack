import { StarField } from "./StarsField";

export class Star {
  private field: StarField;
  public orbitRadius: number = 0;
  public rotationStep: number = 0;
  public orbitAngle: number = 0;
  public starSize: number = 0;
  public starAlpha: number = 0;

  constructor(field: StarField) {
    this.field = field;
    this.initValues();
  }

  initValues() {
    const canvas = this.field.getCanvas();
    const maxOrbit = Math.hypot(canvas.width, canvas.height) / 2;
    this.orbitRadius = this.random(0, maxOrbit);
    this.rotationStep = this.random(0.0005, 0.002);
    this.orbitAngle = this.random(0, Math.PI * 2);
    this.starSize = this.random(20, 50);
    this.starAlpha = this.random(0, 1);
  }

  random(min: number, max?: number): number {
    if (max === undefined) {
      max = min;
      min = 0;
    }
    return Math.random() * (max - min) + min;
  }

  draw() {
    const commonCanvas = this.field.getCanvas();
    const commonCtx = this.field.getCtx();
    const starStamp = this.field.getStarStamp();

    const offsetX = Math.sin(this.orbitAngle) * this.orbitRadius;
    const offsetY = Math.cos(this.orbitAngle) * this.orbitRadius;
    const centerX = commonCanvas.width / 2;
    const centerY = commonCanvas.height / 2;
    const x = offsetX + centerX;
    const y = offsetY + centerY;

    commonCtx.drawImage(
      starStamp,
      x - this.starSize / 2,
      y - this.starSize / 2,
      this.starSize,
      this.starSize
    );

    this.orbitAngle += this.rotationStep;
  }
}
