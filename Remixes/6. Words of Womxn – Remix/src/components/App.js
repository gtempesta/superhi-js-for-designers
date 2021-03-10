import { useState } from 'react';
import './App.css';
import Header from './Header';
import Section from './Section';
import Stamps from './Stamps';

// all the app behaviour will be based on these elements
const elements = [{
    src: '/laverne.jpg',
    src2x: '/laverne-2x.jpg',
    quote: '“Your lives matter. Your voices matter. Your stories matter.”',
    author: 'Laverne Cox',
    customBackgroundColor: '#f4e6d8',
    key: 'xK'
},
{
    src: '/malala.jpg',
    src2x: '/malala-2x.jpg',
    quote: '“If one man can destroy everything, why can one girl change it?”',
    author: 'Malala Yousafzai',
    customBackgroundColor: '#ffd5b1',
    key: 'xZ'
},
{
    src: '/maya.jpg',
    src2x: '/maya-2x.jpg',
    quote: '“You may not control all the events that happen to you, but you can decide not to be reduced by them.”',
    author: 'Maya Angelou',
    customBackgroundColor: '#eeeeee',
    key: 'xHZ'
},
{
    src: '/roxane.jpg',
    src2x: '/roxane-2x.jpg',
    quote: '“[Unlikeable women] accept the consequences of their choices, and those consequences become stories worth reading.”',
    author: 'Roxane Gay',
    customBackgroundColor: '#f4e6d8',
    key: 'ppH'
}];

// here we define the structure of our app
function App() {
    // https://webomnizz.com/change-parent-component-state-from-child-using-hooks-in-react/
    // parent-child communication
    const [background, setBackground] = useState("");

    // this function gets called when the callback is called on the child
    function handleSectionChange(newValue) {
        setBackground(newValue);
    }
    // the style depends on the `background` variable
    const appBackground = {
        backgroundColor: background,
    };
    // we could add this to an element in the component, but we should change too many things in the style
    document.body.style = appBackground;
    return (
        <>
            <Header/>
            <div className="sections">
                {elements.map((value, index) => {
                    // here we pass the props to our section
                    return <Section key={value.key} content={value} index={index} onSectionChanged={handleSectionChange} />
                })}
            </div>
            <Stamps/>
        </>
    );
}

export default App;
