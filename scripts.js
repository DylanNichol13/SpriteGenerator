const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Upscale our pixel art
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

var spritePartsCount = 3;

var imageURL = [];
var images = [];
var imageCount = 0;

//Sprite Generation
function createSprite() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);

    var bodyRnd = Math.floor(Math.random() * spritePartsCount) + 1;
    var detailRnd = Math.floor(Math.random() * spritePartsCount) + 1;
    var faceRnd = Math.floor(Math.random() * spritePartsCount) + 1;

    imageURL = ['assets/body/body' + bodyRnd + '.png',
    'assets/detail/detail' + detailRnd + '.png',
    'assets/face/face' + faceRnd + '.png'];

    images = [];
    imageCount = 0;

    imageURL.forEach(src => {
        const image = new Image();
        image.src = src;
        image.onload = () => {
            imageCount += 1;
            if (imageCount === imageURL.length) {
                renderImages();
            }
        }
        images.push(image);
    })
}

//Sprite Rendering
function renderImages() {
    var size = 16 * 10;
    var centerX = canvas.width / 2 - size / 2;
    var centerY = canvas.height / 2 - size / 2;

    ctx.drawImage(images[0], centerX, centerY, size, size);
    ctx.drawImage(images[2], centerX, centerY, size, size);
    ctx.drawImage(images[1], centerX, centerY, size, size);
}

//Export sprite
function exportSprite(isFullSize) {

    if (isFullSize) {
        canvas.toBlob((blob) => {
            const timestamp = Date.now().toString();
            const a = document.createElement('a');
            document.body.append(a);
            a.download = `export-${timestamp}.png`;
            a.href = URL.createObjectURL(blob);
            a.click();
            a.remove();
        });
    }
    else {
        var smallCanvas = document.createElement('CANVAS');
        var smallCtx = smallCanvas.getContext('2d');

        smallCanvas.width = 16;
        smallCanvas.height = 16;

        smallCtx.drawImage(images[0], 0, 0);
        smallCtx.drawImage(images[2], 0, 0);
        smallCtx.drawImage(images[1], 0, 0);

        smallCanvas.toBlob((blob) => {
            const timestamp = Date.now().toString();
            const a = document.createElement('a');
            document.body.append(a);
            a.download = `export-${timestamp}.png`;
            a.href = URL.createObjectURL(blob);
            a.click();
            a.remove();
        });
    }
}

document.getElementById('random').onclick = function () { createSprite() };
document.getElementById('export-sprite').onclick = function () { exportSprite(false) };
document.getElementById('export-full').onclick = function () { exportSprite(true) };