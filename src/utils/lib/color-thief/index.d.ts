export default class ColorThief {
  public getColor(sourceImage: HTMLImageElement, quality?: number): number[];
  public getPalette(
    sourceImage: HTMLImageElement,
    colorCount?: number,
    quality?: number
  ): number[][];
}
