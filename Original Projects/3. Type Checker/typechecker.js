// todo watch some properties of a variable holding the state
// and then update the UI accordingly

// initial values too should come from js

// todo at the load time the font face of the text area should be Fira Sans (or whatever font family is selected in the select tag) 

const sentenceTag = document.querySelector('input[type="text"]');
const outputTag = document.querySelector('textarea.output');
// slight	 variation: data comes from js instead of the html
const originalText = 'The quick brown fox jumps over the lazy dog';
outputTag.value = originalText;

const typesizeTag = document.querySelector('input[name="typesize"]');
const typesizeOutput = document.querySelector('span.typesize-output');

const lineheightTag = document.querySelector('input[name="lineheight"]');
const lineheightOutput = document.querySelector('span.lineheight-output');

const italicTag = document.querySelector('input[name="italic"]');

const typefaceTag = document.querySelector('select[name="typeface"]');

const fontweightTag = document.querySelector('input[name="fontweight"]');
const fontweightOutput = document.querySelector('span.fontweight-output');

const colorTags = document.querySelectorAll('div.colors div');

// also the placeholder comes from js
sentenceTag.placeholder = 'The quick brown fox...';

// when I type in my sentence tag, update the output tag accordingly
// if there's no value, put in the original text
sentenceTag.addEventListener('keyup', function () {
    if (this.value) {
        // outputTag.value = this.value;
        outputTag.value = this.value;
    } else {
        // outputTag.value = originalText;
        outputTag.value = originalText;
    }
});

// when I type in my output tag, update the sentence tag accordingly
outputTag.addEventListener('keyup', function () {
    sentenceTag.value = this.value;
});

// when i change my typesize slider, update the text next to it AND
// change the ouputTag's font size
typesizeTag.addEventListener('input', function () {
    // using a template literal
    outputTag.style.fontSize = `${this.value}px`;
    typesizeOutput.innerHTML = `${this.value}px`;
});

lineheightTag.addEventListener('input', function () {
    outputTag.style.lineHeight = this.value;
    lineheightOutput.innerHTML = this.value;
});

// when i change my italic checkbox, update the font style to either
// normal or italic if it's checked or not
italicTag.addEventListener("change", function () {
    if (this.checked) {
        outputTag.style.fontStyle = "italic";
    } else {
        outputTag.style.fontStyle = "normal";
    }
});

// when i change my select for typeface, update the font family
typefaceTag.addEventListener("input", function () {
    outputTag.style.fontFamily = this.value
});

fontweightTag.addEventListener("input", function () {
    outputTag.style.fontWeight = this.value;
    fontweightOutput.innerHTML = this.value;
});

// go through all of my color tags, then...
// when i click one of them, change the background color and 
// the text color, and make this tag be selected
colorTags.forEach(tag => {

    tag.addEventListener("click", function () {
        outputTag.style.backgroundColor = this.style.backgroundColor;
        outputTag.style.color = this.style.color;

        // reset the classes
        colorTags.forEach(tag => {
            tag.classList.remove("selected");
        });

        // only to this clicked one
        this.classList.add("selected");
    });

});