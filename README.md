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

Now, we're going to create a project using this [link]. This is what we did with firebase and the youtube video API! 
We can call it ml-api-workshop or something similar.
(https://console.cloud.google.com/projectselector2/home/dashboard?_ga=2.77990804.124612528.1588022003-1968968773.1588022003)

To use this API, we need to enable billing in this project. Don't worry, we'll remind you to remove it after you get it working. Open up the dashboard of your project, go to billing, and create a free trial account. There is no automatic billing after the free trial. 

Enable the Cloud Vision API in your project, and then go into your project and instead of making an API key, create a service account and download your key as a JSON file. When you make this service account, be sure to set yourself as the owner of your service account.



## Step by Step
Showing the actual code and putting it in piece by piece ... 
To run , copy past your direct path into your command line. This is what gives your computer your key and enables you to run the program. 
* Explanations of the what **and** the why behind each step. Try to include:
  * higher level concepts
  * best practices

Remember to explain any notation you are using.

```javascript
/* and use code blocks for any code! */
```

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
https://cloud.google.com/vision/docs/face-tutorial#nodejs was used as a resource
* cite any resources
