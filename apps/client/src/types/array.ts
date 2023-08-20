export {};

declare global {
  interface Array<T> {
    removeSecond: () => number;
  }
}

Array.prototype.removeSecond = function (): number {
  return this.reduce((acc, curr) => acc + curr, 0);
};
