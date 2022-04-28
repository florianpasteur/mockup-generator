const Jimp = require('jimp');

async function appWindow(screenshotFile, destinationFile, mockupFile, zoom) {
  const screenshot = await Jimp.read(screenshotFile);
  const mask = await Jimp.read('assets/window-content-mask-full.png');
  const browserMockup = await Jimp.read(mockupFile);

  screenshot.resize(1280 * zoom * 2, 708 * zoom * 2);
  mask.scale(zoom);
  browserMockup.scale(zoom);

  const browserPlaceholder = browserMockup.clone();
  browserPlaceholder.opacity(0).composite(screenshot, 20 * zoom * 2, 73 * zoom * 2)

  browserPlaceholder.mask(mask);
  browserMockup.composite(browserPlaceholder, 0, 0).write(destinationFile);
}


module.exports = {
  browser: async function (screenshot, destinationFile) {
    return appWindow(screenshot, destinationFile, 'assets/browser-overlay.png', 1);
  },
  application: async function (screenshot, destinationFile) {
    return appWindow(screenshot, destinationFile, 'assets/application-overlay.png', 1);
  },
  monitor: async function (screenshot, destinationFile) {
    throw new Error("Unsupported operation")
  }
}
