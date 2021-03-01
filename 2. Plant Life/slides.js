// pick all of the images and layer them based on the z-index
const slideArea = document.querySelector("div.slides");
const images = slideArea.querySelectorAll("img");

// we want to keep track of the current slide 
let currentSlide = 0;
let z = 1;

// when i click the slide area, change the slide based on z-index
slideArea.addEventListener("click", function () {
    currentSlide += 1;

    if (currentSlide > images.length - 1) {
        currentSlide = 0;
    }

    // todo create a maximum for z index as well?
    z += 1;

    // pick the right image
    images[currentSlide].style.zIndex = z;

    // remove the animation from the style for EVERY IMAGE
    images.forEach(image => {
        image.style.animation = "";

        if (z > images.length) {
            const currentIndex = parseInt(image.style.zIndex, 10);
            // image.style.zIndex = currentIndex - 1;
            console.log(currentIndex);
        }

    });

    // doubt: why not add this via css?
    images[currentSlide].style.animation = "fade 0.5s";
});

// when i put my mouse over the slide area, put all of the images
// in a random place
slideArea.addEventListener("mouseover", function () {
    images.forEach(image => {
        // todo maybe use a function where you pass the start, the end and the increment 
        const x = 25 * (Math.floor(Math.random() * 5)) - 50;
        const y = 25 * (Math.floor(Math.random() * 5)) - 50;

        image.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// when i move my mouse away, put the images back
slideArea.addEventListener("mouseout", function () {
    images.forEach(image => {
        image.style.transform = "";
    });
});
