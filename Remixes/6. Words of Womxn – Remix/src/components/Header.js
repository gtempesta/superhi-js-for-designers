import { useEffect, useState } from 'react';
import logo from '../assets/logo.svg';
import './Header.css';

function Header() {
    // start from here https://stackoverflow.com/questions/57453141/using-react-hooks-to-update-w-scroll
    // useState hook to control if the header is scrolled or not
    const [headerScrolled, setHeaderScrolled] = useState(false);
    // useEffect hook to listen to the scroll event
    useEffect(() => {
        const onScroll = () => {
            // check current scroll state
            const currentPosition = window.pageYOffset;
            if (currentPosition > 80) {
                // we are past 80
                setHeaderScrolled(true);
            } else {
                // we are not past 80
                setHeaderScrolled(false);
            }
        };
        // add event listener
        window.addEventListener("scroll", onScroll);
        // remove event listener
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (
        <header className={headerScrolled ? 'scrolled' : ''}>
            <img src={logo} alt="Words by Womxn" />
        </header>
    );
}

export default Header;
