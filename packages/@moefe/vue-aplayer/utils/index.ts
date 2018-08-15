/* eslint-disable no-param-reassign */

export function shuffle(arr: any[]) {
  for (let i = arr.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const itemAtIndex = arr[randomIndex];
    arr[randomIndex] = arr[i];
    arr[i] = itemAtIndex;
  }
  return arr;
}

export class HttpRequest {
  private xhr = new XMLHttpRequest();

  public download<T>(
    url: string,
    responseType: XMLHttpRequestResponseType = '',
  ) {
    return new Promise<T>((resolve, reject) => {
      this.xhr.open('get', url);
      this.xhr.responseType = responseType;
      this.xhr.onload = () => {
        const { status } = this.xhr;
        if ((status >= 200 && status < 300) || status === 304) {
          resolve(this.xhr.response);
        }
      };
      this.xhr.onabort = reject;
      this.xhr.onerror = reject;
      this.xhr.ontimeout = reject;
      this.xhr.send();
    });
  }
}
