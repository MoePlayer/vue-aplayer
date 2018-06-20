export function sleep(delay: number = 0): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export function eventLoop(
  target: () => any,
  timeout: number = 3000,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const startTime = new Date().getTime();
    const timerId = setInterval(() => {
      if (!target()) {
        if (timeout > 0 && new Date().getTime() - startTime > timeout) {
          reject();
          clearInterval(timerId);
        }
        return;
      }
      resolve();
      clearInterval(timerId);
    }, 100);
  });
}
