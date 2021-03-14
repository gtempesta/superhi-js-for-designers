// declare all the tags
const sentenceTag = document.querySelector('input[type="text"]');
const outputTag = document.querySelector('textarea.output');

const typesizeTag = document.querySelector('input[name="typesize"]');
const typesizeOutput = document.querySelector('span.typesize-output');

const lineheightTag = document.querySelector('input[name="lineheight"]');
const lineheightOutput = document.querySelector('span.lineheight-output');

const italicTag = document.querySelector('input[name="italic"]');

const typefaceTag = document.querySelector('select[name="typeface"]');

const fontweightTag = document.querySelector('input[name="fontweight"]');
const fontweightOutput = document.querySelector('span.fontweight-output');

const colorTags = document.querySelectorAll('div.colors div');

// this variable will hold all the data
const state = {
    originalText: 'The quick brown fox jumps over the lazy dog',
    placeholder: 'The quick brown fox...',
    renderedText: '',
    fontFamily: 'Fira Sans',
    fontSize: 64,
    fontWeight: 400,
    lineHeight: 1.5,
    fontStyle: 'normal',
    colorPairing: {
        color: '#ffffff',
        backgroundColor: '#2a2a2a',
    },
};

// here we define all methods that are called when there is a change in the state
const methods = {
    setInitialText(text, placeholder) {
        // update text in text input and textarea
        outputTag.value = text;
        sentenceTag.value = '';
        sentenceTag.placeholder = placeholder;
    },
    updateRenderedText(text) {
        // update text in text input and textarea
        outputTag.value = text;
        sentenceTag.value = text;
    },
    updateFontSize(fontSize) {
        // using a template literal
        // update font size in textarea and typeSizeOutput
        outputTag.style.fontSize = `${fontSize}px`;
        typesizeOutput.innerHTML = `${fontSize}px`;
    },
    updateLineHeight(lineHeight) {
        // update line height in textarea and lineheightOutput
        outputTag.style.lineHeight = lineHeight;
        lineheightOutput.innerHTML = lineHeight;
    },
    updateFontFamily(fontFamily) {
        // update font family in textarea
        outputTag.style.fontFamily = fontFamily;
    },
    updateFontStyle(fontStyle) {
        // update fontStyle in textarea
        outputTag.style.fontStyle = fontStyle;
    },
    updateFontWeight(fontWeight) {
        // update font weight in textarea and fontweightOutput
        outputTag.style.fontWeight = fontWeight;
        fontweightOutput.innerHTML = fontWeight;
    },
    updateColorPairing(colorPairing) {
        // update color pairings in textarea
        outputTag.style.backgroundColor = colorPairing.backgroundColor;
        outputTag.style.color = colorPairing.color;
    },
};

// in this variable we handle all the changes in the proxy variable
const stateHandler = {
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
    // call methods from the methods object
    updateRenderedText(text) {
        methods.updateRenderedText(text);
    },
    updateFontSize(fontSize) {
        methods.updateFontSize(fontSize);
    },
    updateLineHeight(lineHeight) {
        methods.updateLineHeight(lineHeight);
    },
    updateFontFamily(fontFamily) {
        methods.updateFontFamily(fontFamily);
    },
    updateFontStyle(fontStyle) {
        methods.updateFontStyle(fontStyle);
    },
    updateFontWeight(fontWeight) {
        methods.updateFontWeight(fontWeight);
    },
    updateColorPairing(colorPairing) {
        methods.updateColorPairing(colorPairing);
    },
};

// https://dev.to/mandrewdarts/vanilla-change-detection-with-proxies-in-javascript-3kpe
// here we declare a proxy variable
const stateProxy = new Proxy(state, stateHandler);

// set initial state calling methods defined in the methods object
methods.setInitialText(state.originalText, state.placeholder);
methods.updateFontFamily(state.fontFamily);
methods.updateFontSize(state.fontSize);
methods.updateFontWeight(state.fontWeight);
methods.updateLineHeight(state.lineHeight);
methods.updateFontStyle(state.fontStyle);
methods.updateColorPairing(state.colorPairing);

// when I type in my sentence tag, update the output tag accordingly
// if there's no value, put in the original text
sentenceTag.addEventListener('keyup', function () {
    let newText;
    if (this.value) {
        newText = this.value;
    } else {
        newText = state.originalText;
    }
    // update renderedText
    stateProxy.renderedText = newText;
});

// when I type in my output tag, update the sentence tag accordingly
outputTag.addEventListener('keyup', function () {
    // update renderedText
    stateProxy.renderedText = this.value;
});

// when I change my typesize slider, update the text next to it AND
// change the ouputTag's font size
typesizeTag.addEventListener('input', function () {
    // update font size
    stateProxy.fontSize = this.value;
});

lineheightTag.addEventListener('input', function () {
    // update line height
    stateProxy.lineHeight = this.value;
});

// when I change my italic checkbox, update the font style to either
// normal or italic if it's checked or not
italicTag.addEventListener("change", function () {
    // update font style
    stateProxy.fontStyle = this.checked ? 'italic' : 'normal';
});

// when I change my select for typeface, update the font family
typefaceTag.addEventListener("input", function () {
    // update font family
    stateProxy.fontFamily = this.value;
});

fontweightTag.addEventListener("input", function () {
    // update font weight
    stateProxy.fontWeight = this.value;
});

// go through all of my color tags, then...
// when i click one of them, change the background color and 
// the text color, and make this tag be selected
colorTags.forEach(tag => {

    tag.addEventListener("click", function () {

        // update color pairings
        stateProxy.colorPairing = {
            color: this.style.color,
            backgroundColor: this.style.backgroundColor,
        };

        // reset the classes
        colorTags.forEach(tag => {
            tag.classList.remove("selected");
        });

        // only to this clicked one
        this.classList.add("selected");
    });
});
