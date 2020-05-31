const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
const fs = require('fs');

async function detectFaces(inputFile) {
    // Some code here 
    const request = {image: {source: {filename: inputFile}}};
    const results = await client.faceDetection(request);
    const faces = results[0].faceAnnotations;
    const numFaces = faces.length;
    console.log(`Found ${numFaces} face${numFaces === 1 ? '' : 's'}.`);
    return faces;
}

async function highlightFaces(inputFile, faces, outputFile, Canvas) {
    // initial set up: prepare input image
    const {promisify} = require('util');
    const readFile = promisify(fs.readFile);
    const image = await readFile(inputFile);
    const Image = Canvas.Image;
    
    // open image in canvas
    const img = new Image(); // instantiate new image
    img.src = image; // assign image from earlier to img.src
    const canvas = new Canvas.Canvas(img.width, img.height); // canvas
    const context = canvas.getContext('2d'); // understand its context
    context.drawImage(img, 0, 0, img.width, img.height); // call draw image
    context.strokeStyle = 'rgba(0,255,0,0.8)';
    context.lineWidth = '5';
    console.log('faces');
    console.log(faces);
    faces.forEach(face => {
    context.beginPath();
    let origX = 0;
    let origY = 0;
    face.boundingPoly.vertices.forEach((bounds, i) => {
        if (i === 0) {
            origX = bounds.x;
            origY = bounds.y;
        }
        context.lineTo(bounds.x, bounds.y);
        // context.quadraticCurveTo(bounds.x, bounds.y);
        });
        context.lineTo(origX, origY);
        // context.quadraticCurveTo(origX, origY);
        context.stroke();
    });

    // write results to output (via data streams!)
    console.log(`Writing to file ${outputFile}`);
    const writeStream = fs.createWriteStream(outputFile);
    const pngStream = canvas.pngStream();
    
    await new Promise((resolve, reject) => {
        pngStream
        .on('data', chunk => writeStream.write(chunk))
        .on('error', reject)
        .on('end', resolve);
    });
}

async function main(inputFile, outputFile) {
    const Canvas = require('canvas');
    outputFile = outputFile || 'out.png';
    /* your code here! console logs may be helpful... */
    // const faces = detectFaces(inputFile);
    detectFaces(inputFile)
    .then((faces) => {
        console.log('Highlighting...');
        highlightFaces(inputFile, faces, outputFile, Canvas);
        console.log('Finished!');
    });
    // console.log('Highlighting...');
    // await highlightFaces(inputFile, faces, outputFile, Canvas);
    // console.log('Finished!');
}

const args = process.argv.slice(2);
main(...args).catch(console.error);