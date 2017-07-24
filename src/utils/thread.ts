export class Thread {

  public static sleep (delay): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, delay || 0))
  }

}
