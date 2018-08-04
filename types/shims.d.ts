/* eslint-disable import/export */

declare module '*.json' {
  const value: any;
  export default value;
}

declare class ColorThief {
  getColor(sourceImage: HTMLImageElement, quality?: number): number[];
  getPalette(
    sourceImage: HTMLImageElement,
    colorCount?: number,
    quality?: number
  ): number[][];
}
