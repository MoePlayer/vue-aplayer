export class Thread {

  public static sleep (delay) {
    return new Promise(resolve => setTimeout(resolve, delay || 0))
  }

}
