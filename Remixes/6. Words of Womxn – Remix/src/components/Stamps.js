import { useState, useEffect } from 'react';
import './Stamps.css';

const stampList = [
    "circles.svg",
    "heart.svg",
    "moon.svg",
    "rainbow.svg",
    "shooting-star.svg",
    "waves.svg"
]

function Stamps() {
    const [number, setNumber] = useState(0);
    const [images, setImages] = useState([]);
    const addStamp = ({pageX, pageY}) => {
        const x = pageX;
        const y = pageY;
        
        const src = stampList[number];
        const left = `${(x - window.innerWidth / 2)}px`;
        const top = `${y}px`;

        // update the images array with the new values
        // without deleting the old ones
        // https://stackoverflow.com/questions/54676966/push-method-in-react-hooks-usestate
        setImages([...images, {
            src,
            left,
            top,
        }]);

        let innerNumber = number + 1;
        if (innerNumber > stampList.length - 1) {
            innerNumber = 0;
        }
        // in order not to call setNumber too many times we use the internal variable innerNumber
        setNumber(innerNumber);
        // create a new sound element each time
        const sound = new Audio('plop.mp3');
        sound.play();
    }
    useEffect(() => {
        // add event listener
        document.addEventListener("click", addStamp);
        // remove event listener
        return () => document.removeEventListener("click", addStamp);
    });
    return (
        <div className="stamps">
            {/* this is where our stamps go */}
            {images.map((value, index) => {
                // here we create our images
                return <img key={index} src={value.src} style={{top: value.top, left: value.left}} />
            })}
        </div>
    );
}

export default Stamps;
