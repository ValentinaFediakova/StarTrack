import { StarField } from "./StarsField";

export class Star {
  private field: StarField;
  public orbitRadius: number = 0;
  public rotationStep: number = 0;
  public orbitAngle: number = 0;
  public starSize: number = 0;
  public starAlpha: number = 0;

  private x3d: number = 0;
  private y3d: number = 0;
  private z3d: number = 0;

  constructor(field: StarField) {
    this.field = field;
    this.initValues();
  }

  initValues() {
    const canvas = this.field.getCanvas();
    const maxOrbit = Math.hypot(canvas.width, canvas.height) / 2;
    const mode = this.field.config.mode;

    this.starAlpha = this.random(0, 1);

    if (mode === "orbit") {
      this.orbitRadius = this.random(0, maxOrbit);
      this.rotationStep = this.random(0, this.orbitRadius) / 500000;
      this.orbitAngle = this.random(0, Math.PI * 2);
      this.starSize = this.random(60, this.orbitRadius) / 12;
    } else {
      this.x3d = this.random(-canvas.width / 2, canvas.width / 2);
      this.y3d = this.random(-canvas.height / 2, canvas.height / 2);
      this.z3d = this.random(1, maxOrbit);
      this.rotationStep = this.random(2, 5);
      const xFactor = Math.abs(this.x3d) / (canvas.width / 2);
      const minSize = 1;
      const maxSize = 5;
      this.starSize = minSize + xFactor * (maxSize - minSize);
    }
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
    const mode = this.field.config.mode;
    const cx = commonCanvas.width / 2;
    const cy = commonCanvas.height / 2;

    const twinkleIntensity = 0.2;
    const twinklePoss = 0.1;
    const rnd = Math.random();
    if (rnd < twinklePoss) {
      this.starAlpha = Math.max(0, this.starAlpha - twinkleIntensity);
    } else if (rnd < twinklePoss * 2) {
      this.starAlpha = Math.min(1, this.starAlpha + twinkleIntensity);
    }

    if (mode === "orbit") {
      const x = Math.sin(this.orbitAngle) * this.orbitRadius + cx;
      const y = Math.cos(this.orbitAngle) * this.orbitRadius + cy;
      commonCtx.globalAlpha = this.starAlpha;
      commonCtx.drawImage(
        starStamp,
        x - this.starSize / 2,
        y - this.starSize / 2,
        this.starSize,
        this.starSize
      );
      commonCtx.globalAlpha = 1;
      this.orbitAngle += this.rotationStep * this.field.config.speedFactor;
    } else {
      this.z3d -= this.rotationStep * this.field.config.speedFactor;
      if (this.z3d <= 0) {
        this.x3d = this.random(-cx, cx);
        this.y3d = this.random(-cy, cy);
        this.z3d = this.random(1, Math.hypot(cx, cy));
      }
      const f = 300;
      const scale = f / (f + this.z3d);
      const x2 = this.x3d * scale + cx;
      const y2 = this.y3d * scale + cy;
      const size = this.starSize * scale * 8;
      commonCtx.globalAlpha = this.starAlpha;
      commonCtx.drawImage(starStamp, x2 - size / 2, y2 - size / 2, size, size);
      commonCtx.globalAlpha = 1;
    }
  }

  public updateSpeedStars(factor: number) {
    this.field.config.speedFactor = factor;
  }
}
