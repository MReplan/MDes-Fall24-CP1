// Grab all the images, the children of the gallery thumbnail
let thumbImages = document.querySelectorAll(".gallery-thumb > img")

//I learned about const, and I feel it's more appropriate for these items:
const fleetButton = document.getElementById('fleetButton');
const resultMessage = document.getElementById('resultMessage');
const aiText = document.getElementById('aiText'); // Reference to the AI text paragraph


console.log(thumbImages) //Show the grabbed data!
//Let's get the source of the currently viewed image
//By changing scImage's src, this changes it to selected img
let scImage = document.getElementById("showcaseImage") 


//Let's add a listener for clicks for each and trigger changeImage
for(let i=0; i<thumbImages.length; i++){
    thumbImages[i].addEventListener("click", changeImage)
}


function changeImage(event) { //event is any event!
    let thumbSrc = event.target.src
    scImage.src = thumbSrc //Boom! Changes the viewer image

    //Remove the bounding selector box from all thumbnails
    thumbImages.forEach(function(elem){
        elem.parentElement.classList.remove("current-thumb")
    })

    //...And add the selector box by adding current-thumb
    event.target.parentElement.classList.add("current-thumb")
} //end of function


//OKAY!!! Let's focus on the feedback button:
// Add event listener to button
fleetButton.addEventListener('click', () => {
    // Check if the current image is the second one (naval fleet)
    imageSrc = showcaseImage.getAttribute('src');
    secondImage = 'images/navalfleet_yy_planetLabs.webp';
    
    // Extract just the filename part if the path is absolute
    imageName = imageSrc.split('/').pop(); // Gets the filename part only
    
    if (imageName === secondImage.split('/').pop()) {
        resultMessage.textContent = "My R-CNN has 99.9% Confidence Match. Your cooperation is valued.";
        resultMessage.style.color = "green";

        // Update the AI text
        aiText.textContent = "Thank you, User. You made a difference. My creators will take it from here.";
        
        // Let's disable the fleet button!
        fleetButton.disabled = true;
        fleetButton.style.cursor = 'not-allowed'; // Optional: Change cursor to indicate disabled state
        fleetButton.style.opacity = '0.6'; // Optional: Change appearance to indicate disabled state





    } else {
        resultMessage.textContent = "Low confidence match to my R-CNN. Try again, User.";
        resultMessage.style.color = "red";
    }



});



