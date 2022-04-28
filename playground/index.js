const mergeImages = require('merge-images');
const { Canvas, Image } = require('canvas');

mergeImages(['./assets/body.png', './assets/eyes.png', './assets/mouth.png'], {
  Canvas: Canvas,
  Image: Image
})
  .then(b64 => base64ToPNG(b64, './dist/out.png'));


const fs = require('fs');
const path = require('path');

function base64ToPNG(data, outputFile) {
  data = data.replace(/^data:image\/png;base64,/, '');

  fs.writeFile(path.resolve(__dirname, outputFile), data, 'base64', function(err) {
    if (err) throw err;
  });
}


var Jimp = require('jimp');

// open a file called "lenna.png"
Jimp.read('./assets/body.png', (err, lenna) => {
  if (err) throw err;
  lenna
      .resize(256, 256) // resize
      .quality(60) // set JPEG quality
      .greyscale() // set greyscale
      .write('./dist/body.png'); // save
});


async function main() {
  // const screenshot = await Jimp.read('assets/img.png');
  const screenshot = await Jimp.read('assets/img.png');
  const mask = await Jimp.read('assets/window-content-mask-full.png');
  const browserMockup = await Jimp.read('assets/browser-overlay.png');
  const browserPlaceholder = await Jimp.read('assets/browser-overlay.png');

  screenshot.resize(1280, 708);
  browserPlaceholder.opacity(0).composite(screenshot, 20, 73)

  // 20 * 73
  // 1280 * 708

  browserPlaceholder.mask(mask);
  browserMockup.composite(browserPlaceholder, 0, 0).write('./dist/merge.png');
}

main();
