/* eslint-disable import/export */

declare const APLAYER_VERSION: string;
declare const GIT_HASH: string;

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
