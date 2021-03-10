const irisLeft = document.querySelector("div.iris-left");
const irisRight = document.querySelector("div.iris-right");

let interval = null;

// move the eyes every 3 seconds
const startInterval = function () {
  clearInterval(interval);
  interval = setInterval(() => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    moveEye(irisLeft, x, y);
    moveEye(irisRight, x, y);
  }, 3000);
}

startInterval();

const moveEye = function (tag, mouseX, mouseY) {
  // center of the eye
  const eyeMidX = tag.getBoundingClientRect().left;
  const eyeMidY = tag.getBoundingClientRect().top;

  // find the difference between the eye and the mouse
  const diffX = mouseX - eyeMidX;
  const diffY = mouseY - eyeMidY - window.pageYOffset;

  // pythagoras theorem
  const diff = Math.sqrt(diffX * diffX + diffY * diffY);

   // what is the capped radius
   // 3 is the actual radius, but it can be smaller if we are closer
   const radius = Math.min(3, diff);

  // tan im math
  const angle = Math.atan2(diffY, diffX);
   
  // lets get the capped version of this, based on the angle
  const cappedX = radius * Math.cos(angle);
  const cappedY = radius * Math.sin(angle);

  const eyeTag = tag.querySelector("div");
  
  eyeTag.style.left = `${cappedX}px`;
  eyeTag.style.top = `${cappedY}px`;
   
};

document.addEventListener("mousemove", function (event) {
  // this clears the interval and starts counting again
  // so it will clear for as long as I move the mouse
  // and then after three seconds it will start moving each 3 seconds again
  startInterval();
  moveEye(irisLeft, event.pageX, event.pageY);
  moveEye(irisRight, event.pageX, event.pageY);
});

// setInterval -> happens multiple times, every specified amount of time
// setTimeout -> happens only once, after some amount of time
/*
let interval = window.setInterval(() => {
  // this will happen every 3 seconds -> 3000 milliseconds
}, 3000);
*/

// this clears the interval
// clearInterval(interval);

// for TimeOuts there is the equivalent
// clearTimeout(interval)