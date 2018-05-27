/* eslint-disable import/prefer-default-export */

export enum ReadyState {
  /** 没有关于音频是否就绪的信息 */
  HAVE_NOTHING = 0,
  /** 关于音频就绪的元数据 */
  HAVE_METADATA = 1,
  /** 关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒 */
  HAVE_CURRENT_DATA = 2,
  /** 当前及至少下一帧的数据是可用的 */
  HAVE_FUTURE_DATA = 3,
  /** 可用数据足以开始播放 */
  HAVE_ENOUGH_DATA = 4,
}
