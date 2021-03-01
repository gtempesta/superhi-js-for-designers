// have the content for these pages
const pages = [
  {
    copy: 'a Brooklyn-based graphic designer',
    background: '#edc7a9',
    circle: '#3e78ed'
  },
  {
    copy: 'Kanye West\'s biggest fan',
    background: '#a1fffe',
    circle: '#e34a47'
  },
  {
    copy: 'looking for a job at the start of October',
    background: '#d3c7f3',
    circle: '#f7fe00'
  },
  {
    copy: 'letting you <a href="pdf.pdf">download her PDF</a>',
    background: '#faffb8',
    circle: '#b472e6'
  }
];

// pick the relevant tags
const nextTag = document.querySelector("footer img.next");
const previousTag = document.querySelector("footer img.prev");
const randomTag = document.querySelector('footer img.random')
const outputTag = document.querySelector("h2");
const circleTag = document.querySelector('section div.circle');
const bodyTag = document.querySelector('body');

// this variable will hold the count of the pages and respond to change
const state = {
  count: null,
  update() {
    // call external function
    console.log(`update with pageNumber ${this.pageNumber}`);
    updateSection(this.pageNumber);
  },
  get pageNumber() {
    return this.count;
  },
  set pageNumber(pageNumber) {
    console.log('state updated');
    this.count = pageNumber;
    // here we call a function whenever there's a change in the state
    this.update();
  }
};
 
const updateSection = function (index)  {
  const pageContent = pages[index];
  outputTag.innerHTML = pageContent.copy;
  circleTag.style.backgroundColor = pageContent.circle;
  bodyTag.style.backgroundColor = pageContent.background;
};

// make a next function to increase the pageNumber
const next = function () {
  // take the value from current state
  let { pageNumber } = state;
  pageNumber = pageNumber + 1;
  if (pageNumber > (pages.length - 1)) {
    pageNumber = 0;
  }
  // update the state
  state.pageNumber = pageNumber;
};

// make a previous function to decrease the pageNumber
const previous = function () {
  // take the value from current state
  let { pageNumber } = state;
  pageNumber = pageNumber - 1;
  if (pageNumber < 0) {
    pageNumber = pages.length - 1;
  }
  // update the state
  state.pageNumber = pageNumber;
};

// pick a random slide
const random = function() {
  // update the state
  state.pageNumber = Math.floor(Math.random() * pages.length);
};

// steup content at page load
const setup = function () {
  // update the state
  state.pageNumber = 0;
};

// on click of nextTag, run this
nextTag.addEventListener("click", function () {
  next();
});

// on click of previousTag, run this
previousTag.addEventListener("click", function () {
  previous();
});

// on click of previousTag, run this
randomTag.addEventListener("click", function () {
  random();
});

// when a user presses a key, check for arrow left or right
// and do next or prev correctly
document.addEventListener('keyup', function(event) {

  // if the key being pressed is ArrowRight
  if (event.key === 'ArrowRight') {
    next();
  }

  // if the key being pressed is ArrowLeft
  if (event.key === 'ArrowLeft') {
    previous();
  }
})

// on page load, run this
document.addEventListener("DOMContentLoaded", function() {
  setup();
});
