// when i scroll down the page, at a certain point,
// add a class to make the header white

const headerTag = document.querySelector('header')

const toggleHeader = function() {
  const pixels = window.pageYOffset

  if (pixels > 60) {
    // adding the bg-white class because we are using tailwind and not custom styles
    headerTag.classList.add('scrolled', 'bg-white');
    headerTag.classList.remove('bg-light-blue');
  } else {
    // removing the bg-white class because we are using tailwind and not custom styles
    headerTag.classList.remove('scrolled', 'bg-white');
    headerTag.classList.add('bg-light-blue');
  }
}


const fadeBox = function () {
  const pixels = window.pageYOffset;
  const alpha = Math.min(pixels / 200, 0.25);
  
  headerTag.style.boxShadow = `0 0 10px rgba(0, 0, 0, ${alpha})`;
}

fadeBox();
toggleHeader()

document.addEventListener('scroll', function() {
  toggleHeader()
  fadeBox();
})
