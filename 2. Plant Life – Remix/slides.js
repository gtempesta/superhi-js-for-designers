// pick all of the images and layer them based on the z-index
const slideArea = document.querySelector("div.slides");
const images = slideArea.querySelectorAll("img");

// we want to keep track of the current slide 
let currentSlide = 0;

function snapRandomToGrid(startValue, snapAmount, extension) {
    const randomMultiplier = (extension / snapAmount) + 1;
    return snapAmount * (Math.floor(Math.random() * randomMultiplier)) + startValue;
}

// set initial z-index
images.forEach((image, index) => {
    // if I want 0, 1, 2, 3, 4 to become 4, 3, 2, 1
    // I need to make the total lenght minus the index
    // and if I want 0, 1, 2, 3, 4 to become 10, 9, 8, 7, 6
    // it will be
    const zIndexImage = (images.length * 2) - index;
    console.log(zIndexImage, 'start');
    image.style.zIndex = zIndexImage;
});

// when I click the slide area, change the slide based on z-index
slideArea.addEventListener("click", function () {
    currentSlide += 1;

    if (currentSlide > images.length - 1) {
        currentSlide = 0;
    }

    // non sono convintissimo del lavoro che ho fatto con z-index ma va beh
    images.forEach(image => {
        // subtract one to current z-index
        const newIndex = parseInt(image.style.zIndex, 10) - 1;
        image.style.zIndex = newIndex;
    });
    
    // start with images.length * 2 so we never go negative
    const zIndex = images.length * 2;
    // pick the right image
    images[currentSlide].style.zIndex = zIndex;
    
    // remove the animation from the style for EVERY IMAGE
    images.forEach(image => {
        image.style.animation = "";
    });
    
    // doubt: why not add this via css?
    images[currentSlide].style.animation = "fade 0.5s";
});

// when i put my mouse over the slide area, put all of the images
// in a random place
slideArea.addEventListener("mouseover", function () {
    images.forEach(image => {
        const startingPoint = -50;
        const snapAmount = 25;
        const valuesExtension = 100;

        const x = snapRandomToGrid(startingPoint, snapAmount, valuesExtension);
        const y = snapRandomToGrid(startingPoint, snapAmount, valuesExtension);
        
        image.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// when i move my mouse away, put the images back
slideArea.addEventListener("mouseout", function () {
    images.forEach(image => {
      image.style.transform = "";
    });
});
