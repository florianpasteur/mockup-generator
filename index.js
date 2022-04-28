const Jimp = require('jimp');

async function main() {
  const screenshot = await Jimp.read('assets/img.png');
  const mask = await Jimp.read('assets/window-content-mask-full.png');
  const browserMockup = await Jimp.read('assets/browser-overlay.png');
  const browserPlaceholder = browserMockup.clone();

  screenshot.resize(1280, 708);
  browserPlaceholder.opacity(0).composite(screenshot, 20, 73)

  browserPlaceholder.mask(mask);
  browserMockup.composite(browserPlaceholder, 0, 0).write('./dist/merge.png');
}

main();
