/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */

export function shuffle(arr: any[]) {
  for (let i = arr.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const itemAtIndex = arr[randomIndex];
    arr[randomIndex] = arr[i];
    arr[i] = itemAtIndex;
  }
  return arr;
}
