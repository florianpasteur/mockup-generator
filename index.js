const Jimp = require('jimp');

async function appWindow(screenshotFile, destinationFile, mockupFile) {
  const screenshot = await Jimp.read(screenshotFile);
  const mask = await Jimp.read('assets/window-content-mask-full.png');
  const browserMockup = await Jimp.read('assets/browser-overlay.png');
  const browserPlaceholder = browserMockup.clone();

  screenshot.resize(1280, 708);
  browserPlaceholder.opacity(0).composite(screenshot, 20, 73)

  browserPlaceholder.mask(mask);
  browserMockup.composite(browserPlaceholder, 0, 0).write(destinationFile);
}


module.exports = {
  browser: async function (screenshot, destinationFile) {
    return appWindow(screenshot, destinationFile, 'assets/browser-overlay.png');
  },
  application: async function (screenshot, destinationFile) {
    return appWindow(screenshot, destinationFile, 'assets/application-overlay.png');
  },
  monitor: async function (screenshot, destinationFile) {
    throw new Error("Unsupported operation")
  }
}
