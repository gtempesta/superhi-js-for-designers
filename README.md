# SuperHi – JavaScript for Designers

Here are the exercises I have done following the course "JavaScript for Designers" in the SuperHi website. For each exercise I have also created a "remix" version. What I've done in those remixes was creating the same project but with some differences in the structure or implementation. 

## 1. Rose Culver

The project is a slider navigating different contents.\
In the remix, instead of manually updating every part of the slideshow I have created a variable holding the state (the index at which the slideshow is in the current moment), which would trigger the same function every time its value changes. 

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