export abstract class Config {
  public static readonly baseURL: string = 'https://api.quq.cat'
  public static readonly apis = {
    playlist: '/playlist/detail?id=805272969',
    playurl: '/music/url',
    lyric: '/lyric'
  }
}
