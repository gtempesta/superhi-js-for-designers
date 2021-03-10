import { useEffect, useState, useRef } from 'react';
import './Section.css';
// import src from '../assets/laverne.jpg';
// import src2x from '../assets/laverne-2x.jpg';

// if the images src is dynamic it's better to take it from the public folder, otherwise I should copy it with webpack

function Section({ content, index, onSectionChanged }) {
    // get a reference to the DOM element
    const sectionRef = useRef(null);
    // use a shared variable/state
    const [distance, setDistance] = useState(0);
    const addMovement = () => {
        // compute variables
        const topViewport = window.pageYOffset;
        const midViewport = topViewport + (window.innerHeight / 2);
        // take the value from the DOM element
        const { offsetTop, offsetHeight } = sectionRef.current;
        const topSection = offsetTop;
        const midSection = topSection + (offsetHeight / 2);
        const distanceToSection = midViewport - midSection;
        // check for the background
        const pixels = topViewport;
        const top = offsetTop;
        const bottom = offsetTop + offsetHeight;
        if (distance > -100 && top <= pixels && pixels <= bottom) {
            // update the body style only when we are on a specific section
            const updatedBackground = content.customBackgroundColor;
            // Here, we invoke the callback with the new value
            onSectionChanged(updatedBackground);
        }
        // update shared variable (distance)
        setDistance(distanceToSection);
    };
    useEffect(() => {
        // add event listener
        window.addEventListener("scroll", addMovement);
        // remove event listener
        return () => window.removeEventListener("scroll", addMovement);
    });
    useEffect(() => {
        // add event listener
        window.addEventListener("resize", addMovement);
        // remove event listener
        return () => window.removeEventListener("resize", addMovement);
    });
    // compute variables based on reactive variable (distance)
    let rotation = distance / 100;
    // index is a prop passed by App
    if (index % 2 === 1) {
        rotation = rotation * -1;
    }
    const contentDist = -1 * distance / 2;
    const contentRotation = -1 * rotation;
    // style for the image
    const imageStyle = {
        transform: `rotate(${rotation}deg)`,
    };
    // style for the content
    const contentStyle = {
        top: `${contentDist}px`,
        transform: `rotate(${contentRotation}deg)`
    };
    return (
        <section ref={sectionRef}>
            <img style={imageStyle} src={content.src} srcSet={`${content.src}, ${content.src2x} 2x`} alt={content.author}/>
            <div style={contentStyle}>
                <h2>
                    {content.quote}
                </h2>
                <p>
                    {content.author}
                </p>
            </div>
        </section>
    );
}

export default Section;
