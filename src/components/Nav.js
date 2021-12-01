import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
// import logo from '../images/water-drop 3.svg';
import logo from '../images/logo.png';

 const Nav = ({ setLibraryStatus, libraryStatus }) => {
    return (
        <nav>
            <div className="header-navbar">
                <img src={logo} alt="logo" />
                <h1>Vibe.io</h1>
            </div>
            <button onClick={() => setLibraryStatus(!libraryStatus)}>
                Playlist
                <FontAwesomeIcon icon={faMusic} id='icon' />   
            </button> 
        </nav>
    )
}

export default Nav