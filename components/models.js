import { range } from "../utils/statistics";

class Line {
    constructor(w1, w2) {
      this.w1 = w1;
      this.w2 = w2;
    }
    generateDataForView(xmin=-1, xmax=1){
        const xArray = range(xmin)(xmax)(0.01)
        const res = xArray.map((x) => {return {x: x, line_y: this.w2*x + this.w1}})
        return res
    }
  }

export {Line}