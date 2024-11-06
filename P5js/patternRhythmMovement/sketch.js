//Mikey Replan - Creative Prototyping
let gridSize = 5; //Define the grid dims! 5x5 grid
let squareSize = 80; // Size of each cell in the grid, px
let squareInnerSize = squareSize * 0.5; // Size of each square, 50% of cell size
let centerX, centerY; // Center cell coordinates
let maxDistance; // Maximum distance from the center
let time = 0; // Time variable to animate the movement

function setup() {
  createCanvas(400, 400); //For simplicity here, square canvase!
  colorMode(HSB); // Use HSB color mode
  centerX = floor(gridSize / 2); //Half of the grid dims, 5/2~=3
  centerY = floor(gridSize / 2);
  maxDistance = dist(0, 0, centerX, centerY); // Calculate max distance from center
  noStroke();

  canvas.parent('canvas-holder'); // Attach canvas to #canvas-holder div

}

function draw() {
  background(255);
  drawGrid();
  drawReferenceDots();
  time += 0.05; //Time incrementor to animate the shapes
}

function drawGrid() {
  // Draw the grid
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      // Calculate the distance from the center cell
      let distance = dist(i, j, centerX, centerY);
      
      // Map the distance to a brightness value (closer squares are brighter)
      let brightness = map(distance, 0, maxDistance, 100, 20); // Decrease brightness with distance
      
      // Calculate the oscillating movement based on time and distance
      let movement = map(distance, 0, maxDistance, 0, squareSize * 0.25) * sin(time);

      // Offset each square towards the center, but keep it within its cell boundaries
      let offsetX = (centerX - i) * movement;
      let offsetY = (centerY - j) * movement;
      
      // Calculate x and y position for each square within its cell, applying the offset
      let x = i * squareSize + (squareSize - squareInnerSize) / 2 + offsetX;
      let y = j * squareSize + (squareSize - squareInnerSize) / 2 + offsetY;
      
      // Set fill color with a constant hue, full saturation, and calculated brightness
      fill(200, 100, brightness);
      
      // Draw each square with calculated position and brightness
      rect(x, y, squareInnerSize, squareInnerSize);
      

      
      
    }
  }
} //End of drawGrid!


//Make a helper function to plot the reference grid dots!
function drawReferenceDots() {
  // Draw reference dots at each grid cell center
  fill(0); // Black color for dots
  noStroke();
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let dotX = i * squareSize + squareSize / 2;
      let dotY = j * squareSize + squareSize / 2;
      ellipse(dotX, dotY, 5, 5); // Draw small dot for reference
    }
  }
}


// function displayDistance() {
//   // Display the distance of the first square (at 0, 0) from the center
//   let firstSquareDistance = dist(0, 0, centerX, centerY);
//   fill(0); // Black color for text
//   textSize(12);
//   textAlign(RIGHT, BOTTOM);
//   text(`Distance of (0,0) to center: ${nf(firstSquareDistance, 1, 2)}`, width - 10, height - 10);
// }

