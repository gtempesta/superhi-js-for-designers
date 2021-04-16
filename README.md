![SuperHi](image.png)
# SuperHi – JavaScript for Designers

Here are the exercises I have done following the course ["JavaScript for Designers"](https://www.superhi.com/courses/javascript-for-designers) in the SuperHi website. For each exercise I have also created a "remix" version. What I've done in those remixes was creating the same project but with some differences in the structure or implementation. 

## 1. Rose Culver

### Original
https://rose-10.superhi.com/

The project is a slider navigating different contents, each with different colors and a different background.

### Remix
https://rose-culver-with-state.superhi.com/

In the remix, instead of manually calling the updates to the UI, I have created a variable holding the state (the index at which the slideshow is in the current moment), which would trigger the same function every time its value changes. 

So whenever the state is updated like this: 
```js
// update the state
state.pageNumber = pageNumber;
```
The object would trigger a function that updates the UI: 
```js 
const updateSection = function (index) {
  // update based on the content at current index
  const pageContent = pages[index];
  outputTag.innerHTML = pageContent.copy;
  circleTag.style.backgroundColor = pageContent.circle;
  bodyTag.style.backgroundColor = pageContent.background;
}
```
This was a primitive version of the modern frameworks, in which the UI responds to the changes in the state, and was implemented using `getters` and `setters`.

```js
get pageNumber() {
  // the getter is used to read the state from the outside
  return this.count;
},
set pageNumber(pageNumber) {
  // in the setter we update the value but we also call a function (this.update)
  this.count = pageNumber;
  this.update();
}
```
## 2. Plant Life

### Original
https://plant-project.superhi.com/

This project is a different take on the slideshow, in which images are shown by updating their z-index, and the other images are shown when hovering on the slideshow, with animations that are computed with random numbers. 

### Remix
https://plant-project-updated.superhi.com/

Instead of starting all images with a value of zero for the z-index and incrementing it by one at each click, I've tried to compute a set of z-indexes that could be exchanged between the images, so that the value would never exceed a threshold limit. 

To avoid going below zero with indexes I've started with an index that's the double of the lenght of the slides. 

```js
images.forEach((image, index) => {
  // an array of 5 images will generate
  // indexes of 10, 9, 8, 7, 6
  const zIndexImage = (images.length * 2) - index;
  image.style.zIndex = zIndexImage;
});
```

At every new click, all indexes would be decreased by one, while the clicked image would get the maximum index, which is the double of the length of the original array.

```js
images.forEach(image => {
  // subtract one to current z-index
  const newIndex = parseInt(image.style.zIndex, 10) - 1;
  image.style.zIndex = newIndex;
});

// start with images.length * 2 so we never go negative
const zIndex = images.length * 2;
// pick the right image
images[currentSlide].style.zIndex = zIndex;
```

I'm not sure that going with the double of the length of the original array was the best option, but I couldn't come up with a better idea.

Another addition that I've made was a function to compute the amount of random translation along the x and y axis for the slides. 
The values that are generated will be the same as in the original code, but encapsulating the functionality helped me better understand it and make the code re-usable in the future. 

```js
function snapRandomToGrid(startValue, snapAmount, extension) {
  const randomMultiplier = (extension / snapAmount) + 1;
  return snapAmount * (Math.floor(Math.random() * randomMultiplier)) + startValue;
}
```

So instead of writing:
```js
const x = 25 * (Math.floor(Math.random() * 5)) - 50;
```

I could go with:
```js
const startingPoint = -50;
const snapAmount = 25;
const valuesExtension = 100;

const x = snapRandomToGrid(startingPoint, snapAmount, valuesExtension);
```
`startingPoint` represents the lowest value that we want the function to output, `snapAmount` is the distance between the possible output values, and `valuesExtension` is the distance from the lowest value to the highest. 

So in this case the function will output values from -50 to 50, with a distance of 25 one from the other. 

## 3. Type Checker

### Original
https://type-checker-project.superhi.com/

In this project we use different kinds of inputs to update the appearance of a custom text.

### Remix
https://type-checker-with-state.superhi.com/

In the remix I didn't want to update the UI directly from the listeners of the events in the page. Instead I wanted to update a centralized state, and to declare a set of rules that would update the UI based on that state.

In order to manage this I have created a Proxy object, which connects a state to a state handler, which responds to the changes in the proxy object. (This was inspired by this article: https://dev.to/mandrewdarts/vanilla-change-detection-with-proxies-in-javascript-3kpe).

For example, a `keyup` event was not updating directly the text in the textarea: instead it only changed a property in the Proxy called `stateProxy`.

```js
// when I type in my output tag, update the sentence tag accordingly
outputTag.addEventListener('keyup', function () {
  // update renderedText
  stateProxy.renderedText = this.value;
});
```
This would call the `set` function in the `stateHandler` of the `stateProxy`.

This function would update the state in the original `state` variable, and call a different method based on the property that was updated: 

```js
set: function (obj, prop, value) {
  console.log(`${prop} changed from ${obj[prop]} to ${value}`);
  // set property on state
  obj[prop] = value;
  // call a different method based on the property that changed
  const method = {
    renderedText: 'updateRenderedText',
    fontSize: 'updateFontSize',
    lineHeight: 'updateLineHeight',
    fontFamily: 'updateFontFamily',
    fontStyle: 'updateFontStyle',
    fontWeight: 'updateFontWeight',
    colorPairing: 'updateColorPairing',
  }[prop];

  if (method) {
    // only call the method if it exists
    this[method](value);
  }
},
```

So in the case of the `renderedText` property, a function called `updateRenderedText` would be called:
```js
updateRenderedText(text) {
  // update text in text input and textarea
  outputTag.value = text;
  sentenceTag.value = text;
},
```
This resulted in a longer code, but maybe if the application grew it could help me manage the state in a cleaner way.

## 4. Jenna Buchholz

### Original
https://jenna-buchholz-project.superhi.com/

This project is a portfolio in which text contents and colors are updated based on the images that are currently visible in the viewport. We can also see the amount of scrolling in a progress bar, and some custom elements are animated using a parallax. 

### Remix
https://jenna-buchholz-updated.superhi.com/

What I tried to do in the remix was to remove data from the markup and take it from a JavaScript array (simulating what can arrive from request to a back-end server or from an API). This has been done for the progject's name, page number and the presence of a dark background. 

I wasn't able to do this for the parallax amount of the elements because they don't have the same position in the markup in all the sections.
