

function extractFromStandardNormalDistribution() {
  const x = Math.random();
  const y = Math.random();
  const coefficient = Math.sqrt(-2 * Math.log(x));
  const radian = 2 * y * Math.PI;
  const z1 = coefficient * Math.cos(radian);
  // const z2: number = coefficient * Math.sin(radian)
  return z1;
}

///const toFixedToN = digit => n => Number.parseFloat( n.toFixed( digit ) )
const getDigit = (n) => {
  const a = n.toString();
  return !a.includes(".") ? 0 : a.length - a.indexOf(".") - 1;
};
const maxDigit = (...params) => Math.max(...params.map(getDigit));
const fixedToMaxDigit = (...params) => toFixedToN(maxDigit(...params));

const rangeG = (begin) => (end) => (step) =>
  (function* () {
    if (step === 0) return;
    if (Math.sign(end - begin) !== Math.sign(step)) return;
    for (let i = begin; (end - i) * Math.sign(step) > 0; i += step)
      yield fixedToMaxDigit(begin, step)(i);
  })();

const range = (begin) => (end) => (step) =>
  step === 0
    ? []
    : Math.sign(end - begin) !== Math.sign(step)
    ? []
    : [...Array(Math.ceil((end - begin) / step)).keys()].map((e) =>
        fixedToMaxDigit(begin, step)(begin + e * step)
      );
const toFixedToN = (digit) => (n) => Number.parseFloat(n.toFixed(digit));


export {  extractFromStandardNormalDistribution, range };
