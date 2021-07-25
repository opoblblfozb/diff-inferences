import { range } from "../utils/statistics";
import { extractFromStandardNormalDistribution } from "../utils/statistics";

class regressionLine {
  constructor(w1, w2) {
    this.w1 = w1;
    this.w2 = w2;

    this.xmin = -1;
    this.xmax = 1;
    this.ymin = this.w2 * this.xmin + this.w1;
    this.ymax = this.w2 * this.xmax + this.w1;
    // 定義域 xmin xmaxに対応した{定義域，　値域}のセット
    this.segment = [
      { x: this.xmin, lineY: this.ymin },
      { x: this.xmax, lineY: this.ymax },
    ];
  }
  generateXAxisTicksForView(
    xmin = this.xmin,
    xmax = this.xmax,
    buffScale = 0.5,
    step = 0.5
  ) {
    let res = [];
    let min = xmin - Math.abs(xmin * buffScale);
    let max = xmax + xmax * buffScale;
    let tick = min;
    while (tick < max) {
      res.push(tick);
      tick += step;
    }
    res.push(max);
    return res;
  }
  generateYAxisTicksForView(
    ymin = this.ymin,
    ymax = this.ymax,
    buff = 2,
    step = 0.5
  ) {
    console.log(this.ymin, this.ymax);
    let res = [];
    let min = ymin - buff;
    let max = ymax + buff;
    let tick = min;
    while (tick < max) {
      res.push(tick);
      tick += step;
    }
    res.push(max);
    return res;
  }
  generateLineData(xmin = this.xmin, xmax = this.xmax) {
    /// 与えられたLine上の点にnoiseを載せた点を取得する
    const x = Math.random() * (xmax - xmin) + xmin;
    const mean = this.w2 * x + this.w1;
    const noise = extractFromStandardNormalDistribution();
    return { x: x, y: mean + noise };
  }
}

export { regressionLine };
