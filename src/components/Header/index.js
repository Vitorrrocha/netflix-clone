import React from 'react';

import './style.css'

export default ({black}) => {
    return(
        <header className={black ?"black" : ''}>
            <div className='header-logo'>
                <a href='/'><img alt='netflix logo' src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_Netflix.png"/></a>
            </div>
            <div className='header-user'>
                <a href='/'><img alt='user'src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"/></a>
            </div>
        </header>
    )
}