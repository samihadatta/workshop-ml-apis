# CS52 Workshops:  Machine Learning APIs

![](http://i.giphy.com/eUh8NINbZf9Ys.gif)

Brief motivation here as well as in presentation

## Overview
Today, we're going to implement  a machine learning facial recognition program. When given a picture, we are going to see the power of Cloud Vision API at work! 

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
Then run `npm install` to install all the dependencies we need!

Now, we're going to create a project by clicking on this [link](https://console.cloud.google.com/projectselector2/home/dashboard?_ga=2.77990804.124612528.1588022003-1968968773.1588022003). This is basically what we did with firebase and the youtube video API! 
We can call it ml-api-workshop or something similar. Whatever you want, really.

To use this API, make sure you enable billing in the project. Don't worry, we'll remind you to remove it after you get it working. Open up the dashboard of your project, go to billing, and create a free trial account by pressing 'Link a billing account'. There is no automatic billing after the free trial, so you won't be charged. They just want to know you're a human being, apparently. 

Now we need to make a connection from our project to the Cloud Vision API. From project dashboard go to **APIs & Services > Credentials**. Instead of making an API key, as we've done in previous assignments, create a **service account** and download your key to your computer as a JSON file. When you make this service account, be sure to select **Project > Owner** from the role list. This gives your service account full access to the project.

To make sure your credentials are kept private, the key information in the JSON file stays in your JSON file, aka local to your computer and your computer only. To make sure our project itself can access it, we set an environment variable in our command line. Make sure you provide an **absolute path** to the JSON file, as opposed to a relative one, else it won't work! `export GOOGLE_APPLICATION_CREDENTIALS="[PATH]"`

Awesome. You're set to start coding. Yay.

## Step by Step

First, for basic setup, we gotta make a connection to the API. This is similar to how we started our code in datastore.js through firebase. First we require the API, then we create a client. And we need fs so we can use Node's file system.

```javascript
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
const fs = require('fs');
```

Our code is made up of three *async* functions. Can you guess what these will be?

If you guessed detectFaces, highlightFaces, and main, then you were right!

detectFaces will, as it sounds like, detect faces. It will take an inputFile as a parameter and return an array of faces that it 'found'. How does it find these faces? Machine learning, of course!

First we instantiate a request, and then we make a call to our api.
```javascript
const request = {image: {source: {filename: inputFile}}};
const results = await client.faceDetection(request);
```
From our results, we want to create a variable faces, and assign it `results[0].faceAnnotations`. Then we want to store the number of faces it finds. Let's name that numFaces. Then add `console.log('Found ${numFaces} face${numFaces === 1 ? '' : 's'}.');` to print to console however many faces were found in the input image. Pretty cool. Oh yeah, and don't forget to return faces. We're going to need that.

Next function! highlightFaces. Again, pretty self explanatory. We want to make sure the API worked, so we want to highlight the faces that it finds. This function will take four parameters: inputFile, faces, outputFile, Canvas. And it's gonna deal with promises. Fun.

![screen shots are helpful](img/screenshot.png)

:sunglasses: GitHub markdown files [support emoji notation](http://www.emoji-cheat-sheet.com/)

Here's a resource for [github markdown](https://guides.github.com/features/mastering-markdown/).

## Use collapsible sections when you are giving away too much code
<details>
 <summary>Click to expand!</summary>
 
 ```js
 // some code
 console.log('hi');
 ```
</details>



## Summary / What you Learned

* [ ] can be checkboxes

## Reflection

*2 questions for the workshop participants to answer (very short answer) when they submit the workshop. These should try to get at something core to the workshop, the what and the why.*

* [ ] 2 reflection questions
* [ ] 2 reflection questions


## Resources
https://cloud.google.com/vision/docs/face-tutorial#nodejs 
https://cloud.google.com/docs/authentication/getting-started was used as a resource
* cite any resources
