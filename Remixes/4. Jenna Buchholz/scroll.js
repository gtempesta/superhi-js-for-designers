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

// this data was removed from the html to js
const projects = [
    {
        id: 's1',
        client: 'Alter Ego',
        page: '1 / 2',
        darkBackground: 'no',
    },
    {
        id: 's2',
        client: 'Alter Ego',
        page: '2 / 2',
        darkBackground: 'no',
    },
    {
        id: 's3',
        client: 'Valencia Clothing',
        page: '1 / 2',
        darkBackground: 'yes',
    },
    {
        id: 's4',
        client: 'Valencia Clothing',
        page: '2 / 2',
        darkBackground: 'no',
    }
];

// starting data
clientTag.innerHTML = projects[0].client;
pageTag.innerHTML = projects[0].page;

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
});

// when we scroll the page, see how far down the page we've scrolled
// then for each section, check whether we've passed it and if we have...
// then updated the text in the header
document.addEventListener('scroll', function() {
  const pixels = window.pageYOffset;
    sections.forEach((section, index) => {

        const OFFSET_AMOUNT = 60;
        const top = section.offsetTop - OFFSET_AMOUNT;
        const bottom = section.offsetTop + section.clientHeight - OFFSET_AMOUNT;

        // need to check also the bottom in order to have only one project at a time enter here
        if (top <= pixels && pixels <= bottom) {
            const project = projects[index];
            
            // name and page taken from the projects array
            clientTag.innerHTML = project.client;
            pageTag.innerHTML = project.page;
            
            // manage background
            if (project.darkBackground === 'yes') {
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
  
  // when the number on the left (pageYOffset) is equal to the ancorpoint
  // -> elements with parallax are in their original position
  
  // the distance from the original point is based on the difference between the anchor point
  // and the present pageYOffset
  
  sections.forEach((section, index) => {
    const topSection = section.offsetTop;
    const midSection = topSection + (section.offsetHeight / 2);
    const distanceToSection = midViewport - midSection;
    const parallaxTags = section.querySelectorAll(`[data-parallax]`);
    
    // loop over each parallaxed tag
    parallaxTags.forEach(tag => {
      const speed = parseFloat(tag.getAttribute("data-parallax"));
      tag.style.transform = `translate(0, ${distanceToSection * speed}px)`;
    });
  });
});

