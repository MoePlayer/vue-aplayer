const isMobile = /mobile/i.test(window.navigator.userAgent);

if (isMobile) {
  const self: any = window;
  self.MessageChannel = undefined;
  self.setImmediate = undefined;
}
