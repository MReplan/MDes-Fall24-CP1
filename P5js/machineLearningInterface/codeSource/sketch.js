//MIKEY REPLAN | Creative Prototyping Interface Proj.
//    .-~~-.
//  ,|`-__-'|
//  ||      |  Storytell a coffee experience using desk view + ml5
//  `|      |  
//    `-__-'

//12/09/2024
//BLUF: This is a prototype that exercises an exciting/recent capability, Desk View!
// I believe Desk View opens up a lot of accessible/unique experiences, especially how
// its a camera angle that doesn't feel super-invasive, it's looking at your desk!
// (Caveat, it can see your keyboard so one could keylog!)

//For this project, I want to show how desk view can guide a table-top coffee experience!
//Use desk view + neural img to "track" the coffee experience
//...and storytell along the way!!

// Declare all the things!!!!!!!
let classifier;
// Teachable Machine URL | Don't forget to hit update after training!!!
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/HZjeva0Bt/';

// Video and results
let video;
let label = "Loading model...";

// Images for states
let stateImages = {};
let currentStateImage, nextStateImage;
let alpha = 255; // Alpha for fading transition
let currentState = "nothingServed"; // Keep track of the current state


//////////////////////
//M A I N _ C O D E //
//////////////////////
//First, let's load in all the png panes!
function preload() {
  // Load the image model
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');

  // Load the state images and simply match it to the stateNames I use for Teachable
  stateImages["nothingServed"] = loadImage('images/state_0.png'); //All Dark
  stateImages["coasterServed"] = loadImage('images/state_1.png'); //1 of 3 Pane
  stateImages["coffeeServed_filled"] = loadImage('images/state_2.png');
  stateImages["coffeeServed_empty"] = loadImage('images/state_3.png'); //All Panes!
  stateImages["coasterServed_Special"] = loadImage('state_S.jpeg');
}

function setup() {
  // Adjust canvas size to accommodate the PNG resolution
  createCanvas(1179, 720); // 1179 width, 480 PNG section (My png size!), 240 for webcam

  // Create a video element and hide it (just use it for input)
  video = createCapture(VIDEO);
  video.size(640, 480); // Native size
  video.hide();

  // Set initial state image, nothingServed, all dark!!
  currentStateImage = stateImages["nothingServed"];
  nextStateImage = currentStateImage;

  // Start classifying
  classifyVideo();
} //END OF SETUP FUNCTION

function draw() {
  background(0);

  // Draw the current and next state images with fade transition
  drawStateImage();

  // Draw the webcam feed below
  drawWebcam();

  // Display the label ("state")
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(label, width / 2, height - 30);
} 

// FAAADEEEE: Draw the current and next state images with fade transition
function drawStateImage() {
  if (currentStateImage && alpha < 255) {
    // Draw the current state image fading out
    tint(255, 255 - alpha);
    image(currentStateImage, 0, 0, 1179, 480); // PNG section
  }

  if (nextStateImage) {
    // Draw the next state image fading in
    tint(255, alpha);
    image(nextStateImage, 0, 0, 1179, 480); // PNG section
  }

  // Update alpha for the fade transition
  if (alpha < 255) {
    alpha += 10; // Adjust speed of transition by changing increment
  } else {
    // Once the transition is complete, update current state image
    currentStateImage = nextStateImage;
    alpha = 255; // Reset alpha
  }

  noTint(); // Reset tint
}

// Draw the webcam feed, scaled down and centered below the PNG section
function drawWebcam() {
  let webcamWidth = video.width / 2; // 50% smaller
  let webcamHeight = video.height / 2;
  let webcamX = (width - webcamWidth) / 2; // Centered horizontally
  let webcamY = 480; // Positioned right below the PNG section

  image(video, webcamX, webcamY, webcamWidth, webcamHeight);
}

// Function to classify the video feed
function classifyVideo() {
  classifier.classify(video, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  // Store the label
  label = results[0].label;

  // Log the confidence percentages for each label
  //console.clear(); // Clear the console to show updated values only
  results.forEach((result) => {
    console.log(`${result.label}: ${(result.confidence * 100).toFixed(2)}%`);
  });

  // Ensure state only progresses forward | Progressive Logic
  let newState = currentState;
  if (label === "coasterServed" && currentState === "nothingServed") {
    newState = "coasterServed";
  } else if (label === "coffeeServed_filled" && currentState === "coasterServed") {
    newState = "coffeeServed_filled";
  } else if (label === "coffeeServed_empty" && currentState === "coffeeServed_filled") {
    newState = "coffeeServed_empty";
  } else if (label == "coasterServed_Special" && currentState == "coffeeServed_empty") //EASTER EGG
    newState = "coasterServed_Special";
  
  
  // Update the next state image only if the state progresses
  if (newState !== currentState) {
    currentState = newState;
    nextStateImage = stateImages[currentState];
    alpha = 0; // Start the transition
  }

  // Reclassify after getting the result
  classifyVideo();
} //END OF gotRESULT
