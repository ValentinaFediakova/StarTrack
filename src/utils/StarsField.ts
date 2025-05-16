import { Star } from "./Star";

interface Config {
  maxStars: number;
  hue: number;
}

export class StarField {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private animationId: number | null = null;
  public config: Config = {
    maxStars: 1400,
    hue: 217,
  };
  private starStamp: HTMLCanvasElement;
  private stars: Star[] = [];

  constructor(canvas: HTMLCanvasElement, options: Partial<Config> = {}) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d")!;

    this.config = { ...this.config, ...options };
    this.starStamp = this.generateStarStamp();

    this.initStars();

    this.animate = this.animate.bind(this);
  }

  generateStarStamp(): HTMLCanvasElement {
    const starStampCanvasSize = 100;
    const radius = starStampCanvasSize / 2;
    const starStampCanvas = document.createElement("canvas");
    starStampCanvas.width = starStampCanvas.height = starStampCanvasSize;
    const starStampCtx = starStampCanvas.getContext("2d");
    if (!starStampCtx) {
      throw new Error("Failed to get 2D context");
    }
    const grad = starStampCtx.createRadialGradient(
      radius,
      radius,
      0,
      radius,
      radius,
      radius
    );

    grad.addColorStop(0.025, "#fff");
    grad.addColorStop(0.1, `hsl(${this.config.hue},61%,33%)`);
    grad.addColorStop(0.25, `hsl(${this.config.hue},64%, 6%)`);
    grad.addColorStop(1, "transparent");

    starStampCtx.fillStyle = grad;
    starStampCtx.beginPath();
    starStampCtx.arc(radius, radius, radius, 0, Math.PI * 2);
    starStampCtx.fill();

    return starStampCanvas;
  }

  public getStarStamp(): HTMLCanvasElement {
    return this.starStamp;
  }

  public getCanvas() {
    return this.canvas;
  }

  public getCtx() {
    return this.ctx;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  initStars() {
    this.stars = [];

    for (let i = 0; i < this.config.maxStars; i++) {
      this.stars.push(new Star(this));
    }
  }

  private clearFrame(): void {
    const ctx = this.ctx;
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = `hsla(${this.config.hue},64%,6%,1)`;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.globalCompositeOperation = "lighter";
  }

  animate(): void {
    this.clearFrame();

    for (const star of this.stars) {
      star.draw();
    }

    this.animationId = requestAnimationFrame(this.animate);
  }

  public start() {
    if (this.animationId === null) {
      this.animationId = requestAnimationFrame(this.animate);
    }
  }

  stop() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  public updateStarCount(n: number) {
    this.config.maxStars = n;
    this.stop();
    this.initStars();
    this.start();
  }
}
