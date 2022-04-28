const Jimp = require('jimp');

async function appWindow(screenshotFile, destinationFile, mockupFile, zoom) {
  const screenshot = await Jimp.read(screenshotFile);
  const mask = await Jimp.read(`${__dirname}/assets/window-content-mask-full.png`);
  const overlay = await Jimp.read(mockupFile);

  screenshot.resize(1280 * zoom * 2, 708 * zoom * 2);
  mask.scale(zoom);
  overlay.scale(zoom);

  const overlayCopy = overlay.clone();
  overlayCopy.opacity(0).composite(screenshot, 20 * zoom * 2, 73 * zoom * 2)

  overlayCopy.mask(mask);
  overlay.composite(overlayCopy, 0, 0).write(destinationFile);
}

async function monitor(screenshotFile, destinationFile, zoom) {
  const screenshot = await Jimp.read(screenshotFile);
  const mask = await Jimp.read(`${__dirname}/assets/monitor-mask.png`);
  const overlay = await Jimp.read(`${__dirname}/assets/monitor-overlay.png`);

  screenshot.resize(2461 * zoom, 1390 * zoom);
  mask.scale(zoom);
  overlay.scale(zoom);

  const overlayCopy = overlay.clone();
  overlayCopy.opacity(0).composite(screenshot, 87 * zoom, 123 * zoom)

  overlayCopy.mask(mask);
  overlay.composite(overlayCopy, 0, 0).write(destinationFile);
}


module.exports = {
  browser: async function (screenshot, destinationFile) {
    return appWindow(screenshot, destinationFile, `${__dirname}/assets/browser-overlay.png`, 1);
  },
  application: async function (screenshot, destinationFile) {
    return appWindow(screenshot, destinationFile, `${__dirname}/assets/application-overlay.png`, 1);
  },
  monitor: async function (screenshot, destinationFile) {
    // 2461 1390
    // 87 123
    return monitor(screenshot, destinationFile, 1);
  }
}
