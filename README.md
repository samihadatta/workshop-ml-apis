# CS52 Workshops:  Machine Learning APIs

![](http://i.giphy.com/eUh8NINbZf9Ys.gif)

Brief motivation here as well as in presentation aka why do we want to learn about this !

## Overview
Today, we're going to implement  a machine learning facial recognition program. When given a picture, we are going to see the power of Cloud Vision API at work! 


![](https://media.giphy.com/media/7xkxbhryQO7hm/giphy.gif)

## Setup
First, get the API library... 
`npm install -- save @google-cloud/vision`

Then, get canvas, which we use to get the pictures and draw on them...
`npm install canvas `

Now create a package.json file (which you should be pretty familiar with by now) and paste in the following code.
```json
{
  "name": "nodejs-docs-samples-vision",
  "private": true,
  "license": "Apache-2.0",
  "author": "Google Inc.",
  "engines": {
    "node": ">=8"
  },
  "files": [
    "*.js"
  ],
  "scripts": {
    "test": "mocha system-test --timeout 600000"
  },
  "dependencies": {
    "@google-cloud/vision": "^1.11.0",
    "canvas": "^2.0.0",
    "mathjs": "^6.0.0",
    "natural": "^0.6.1",
    "redis": "^3.0.0",
    "yargs": "^15.0.0"
  },
  "devDependencies": {
    "@google-cloud/storage": "^4.0.0",
    "chai": "^4.2.0",
    "mocha": "^7.0.0",
    "uuid": "^7.0.0"
  }
}
```
Then run `npm install` to get all the dependencies we need!

Now, we're going to create a project by clicking on this [link](https://console.cloud.google.com/projectselector2/home/dashboard?_ga=2.77990804.124612528.1588022003-1968968773.1588022003). This is basically what we did with firebase and the youtube video API! 
We can call it ml-api-workshop or something similar. Whatever you want, really.

To use this API, make sure you enable billing in the project. Don't worry, we'll remind you to remove it after you get it working. Open up the dashboard of your project, go to billing, and create a free trial account by pressing 'Link a billing account'. There is no automatic billing after the free trial, so you won't be charged. They just want to know you're a human being, apparently. 

Now we need to make a connection from our project to the Cloud Vision API. From project dashboard (click Google Cloud Platform to return to the dashboard) go to **APIs & Services > Credentials**. Instead of making an API key, as we've done in previous assignments, create a **service account** and download your key to your computer as a JSON file. To do this, click **Create Credentials** and select **Service Account** from the dropdown menu. When you make this service account, be sure to select **Project > Owner** from the role list. This gives your service account full access to the project. Next, click **Create Key** to download a JSON file with your service account key.

To make sure your credentials are kept private, the key information in the JSON file stays in your JSON file, aka local to your computer and your computer only. To make sure our project itself can access it, we set an environment variable in our command line. Make sure you provide an **absolute path** to the JSON file, as opposed to a relative one, else it won't work! `export GOOGLE_APPLICATION_CREDENTIALS="[PATH]"`

Awesome. You're set to start coding. Yay.

![](https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif)

## Step by Step

First, for basic setup, we gotta make a script. Let's call it faceDetection.js. Then we need to give it a connection to the API. This is similar to how we started our code in datastore.js through firebase. First we require the API, then we create a client. And we need fs so we can use Node's file system.

```javascript
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
const fs = require('fs');
```

Our code is made up of three *async* functions. Can you guess what these will be?

If you guessed detectFaces, highlightFaces, and main, then you were right!

detectFaces will, as it sounds like, detect faces. It will take an inputFile as a parameter and return an array of faces that it 'found'. How does it find these faces? Machine learning, of course! Let's write the skeleton of this function as follows.

```javascript
async function detectFaces(inputFile) {
    // Some code here 
}
```

Inside detectFaces(), we first need to instantiate a request and then make a call to our api.
```javascript
const request = {image: {source: {filename: inputFile}}};
const results = await client.faceDetection(request);
```
From our results, we want to create a variable faces and assign it `results[0].faceAnnotations`. Then we want to store the number of faces it finds. Let's name that numFaces `const numFaces = faces.length;`. Then add `console.log('Found ${numFaces} face${numFaces === 1 ? '' : 's'}.');` to print to console however many faces were found in the input image. Pretty cool. :sunglasses: Oh yeah, and don't forget to `return faces;` at the end of our function. We're going to need that. 

Next function! highlightFaces. Again, pretty self explanatory. We want to make sure the API worked, so we want to highlight the faces that it finds. This function will take four parameters: inputFile, faces, outputFile, Canvas. And it's gonna deal with promises. Fun.

There are also four main parts of this function. The initial setup, the opening of the image in canvas, the drawing of the boxes around our faces, and the writing to our output file.

*The Set Up!*
```javascript
const {promisify} = require('util');
const readFile = promisify(fs.readFile);
const image = await readFile(inputFile);
const Image = Canvas.Image;
```
Here we prep our input image, so just copy paste that in your function.

*Opening Canvas!*

Now we want to open our original image in node canvas so we can draw on it. First we want to instantiate a new image. Let's call that img. Then, we want to assign our image (lowercase variable from above), to img.src. Again, set two new variables, canvas and context. With canvas, create a new Canvas as `new Canvas.Canvas(img.width, img.height)`. Then get it's context, using `canvas.getContext('2d');`. Now finally call drawImage on the context variable, with the following parameters: img, 0, 0, img.width, img.height. Now that was a lot. In case you didn't get it all, look below.

<details>
 <summary>See the code!</summary>
  
 ```javascript
 const img = new Image();
 img.src = image;
 const canvas = new Canvas.Canvas(img.width, img.height);
 const context = canvas.getContext('2d');
 context.drawImage(img, 0, 0, img.width, img.height);
 ```
</details>

*The FUN part!*

Finally, we get to highlight the faces! If you want to get fancy and learn more Canvas notation, click [here](https://eloquentjavascript.net/17_canvas.html). You can draw a bunch of fun things. But for now, we're gonna stick to a box. The general idea is, for each face in faces, we want to draw lines that outline the bounds of the face, thus drawing a rectangle. Try it yourself!
<details>
 <summary>See the code!</summary>
  
```javascript
context.strokeStyle = 'rgba(0,255,0,0.8)';
context.lineWidth = '5';
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
    });
    context.lineTo(origX, origY);
    context.stroke();
});
 ```
</details>

*Write the results to output!*

Lastly, we put all our results into an output file, using the following.
```javascript
console.log(`Writing to file ${outputFile}`);
const writeStream = fs.createWriteStream(outputFile);
const pngStream = canvas.pngStream();
  
await new Promise((resolve, reject) => {
   pngStream
      .on('data', chunk => writeStream.write(chunk))
      .on('error', reject)
      .on('end', resolve);
   });
```

Now for the main. You can figure this one out, but here's the structure, for starters. Make sure you are calling each function correctly. *Hint: These are asynchronous functions! You may need to a-wait!*
```javascript
async function main(inputFile, outputFile) {
    const Canvas = require('canvas');
    outputFile = outputFile || 'out.png';
    /* your code here! console logs may be helpful... */
}

const args = process.argv.slice(2);
main(...args).catch(console.error);
```
And now! What you've been waiting for! Running the code!

`node faceDetection tim.png`

Yay! Now try testing it out with other pictures that have more faces. The world is your oyster.

![Solution](/img/tim.png)

![](https://media.giphy.com/media/8JW82ndaYfmNoYAekM/giphy.gif)

## Summary / What you Learned

* [ ] can be checkboxes

## Reflection

*Some quuestions for reflection on our workshop today!*

* [ ] What can machine learning be used for? 
* [ ] Another question !!!!!!!!


## Resources
* https://cloud.google.com/vision/docs/face-tutorial#nodejs 
* https://cloud.google.com/docs/authentication/getting-started
