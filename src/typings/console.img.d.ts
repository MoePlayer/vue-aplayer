interface Console {
  /** 输出默认图片预览 */
  img (): void
  /** 输出指定 URL 图片 */
  img (url: string): void
  /** 输出指定 URL 图片并指定图片宽度 */
  img (url: string, width: number): void
  /** 输出指定 URL 图片并指定图片宽度和高度 */
  img (url: string, width: number, height: number): void
}
