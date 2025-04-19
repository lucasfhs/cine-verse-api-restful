export class NumberRangeValidator {
  constructor(private min: number, private max: number) {}
  inNumberRange(param: number): boolean {
    const num = Number(param);
    if (num >= this.min && num <= this.max) {
      return true;
    } else {
      throw new Error(
        `The number is not within the limits Min: ${this.min} Max: ${this.max} `
      );
    }
  }
}
