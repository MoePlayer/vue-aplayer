export class Thread {

  public static sleep (delay = 0): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, delay))
  }

}
