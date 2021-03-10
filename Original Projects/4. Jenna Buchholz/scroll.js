// the document is the whole content
// the window is just the part that you see of the document

const pixelsTag = document.querySelector('div.pixels');
const bodyTag = document.querySelector('body');
const progressTag = document.querySelector('div.progress');
// more than one element, so I need querySelectorAll
const sections = document.querySelectorAll('section');
const clientTag = document.querySelector('div.client');
const pageTag = document.querySelector('div.page');
const headerTag = document.querySelector('header');

// when we scroll the page, update the pixels tag to be how far we've scrolled
document.addEventListener('scroll', function() {
  const pixels = window.pageYOffset;
  pixelsTag.innerHTML = pixels;
});

// when we scroll the page, make a progress bar that track of the distance
document.addEventListener('scroll', function() {
  // variables can have the same name because it's in a different block
  const pixels = window.pageYOffset;
  const pageHeight = bodyTag.getBoundingClientRect().height;
  const totalScrollableDistance = pageHeight - window.innerHeight;

  const percentage = pixels / totalScrollableDistance;

  progressTag.style.width = `${100 * percentage}%`;
})

// when we scroll the page, see how far down the page we've scrolled
// then for each section, check whether we've passed it and if we have...
// then updated the text in the header
document.addEventListener('scroll', function() {
  const pixels = window.pageYOffset;
  // idea: take data from a JavaScript Object?
  // but then how do I know in which section I am at the moment?
  // maybe in the forEach section I could use the index
  // to extract the data I need
  sections.forEach(section => {
    if (section.offsetTop - 60 <= pixels) {
      clientTag.innerHTML = section.getAttribute("data-client");
      pageTag.innerHTML = section.getAttribute("data-page");
      if (section.hasAttribute("data-is-dark")) {
        headerTag.classList.add("white");
        progressTag.classList.add("white");
      } else {
        headerTag.classList.remove("white");
        progressTag.classList.remove("white");
      }
    }
  });
});

// when we scroll the page, make things parallax
// we want to move certain tags, based on how far they are from an anchor point
// what is the anchor? well its the middle of the section
// how far should we parallax? well, it's a ratio of the middle distance scrolled to the middle point of the anchor
document.addEventListener("scroll", function () {
  const topViewport = window.pageYOffset; // how many pixels we have scrolled
  const midViewport = topViewport + (window.innerHeight / 2); // center of the window
  // console.log(midViewport, 'ciao');
  // when the number on the left (pageYOffest) is equal to the ancorpoint
  // -> elements with parallax are in their original position
  
  // the distance from the original point is based on the difference between the anchor point
  // and the present pageYOffset
  
  sections.forEach((section, index) => {
    const topSection = section.offsetTop;
		const midSection = topSection + (section.offsetHeight / 2);
    // console.log(midSection, 'mid section', index);
    const distanceToSection = midViewport - midSection;
		// console.log(distanceToSection, 'distance to section', index);
    const parallaxTags = section.querySelectorAll(`[data-parallax]`);
    
    // loop over each parallaxed tag
    parallaxTags.forEach(tag => {
      const speed = parseFloat(tag.getAttribute("data-parallax"));
      tag.style.transform = `translate(0, ${distanceToSection * speed}px)`;
    });
  });
});

