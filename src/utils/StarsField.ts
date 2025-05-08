interface Config {
  maxStars: number;
  hue: number;
}

export class StarField {
  private config: Config = {
    maxStars: 800,
    hue: 217,
  };
  private starStamp: HTMLCanvasElement;

  constructor(options: Partial<Config> = {}) {
    this.config = { ...this.config, ...options };
    this.starStamp = this.generateStarStamp();
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
}
