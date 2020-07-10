import React from 'react';
import Tilt from 'react-tilt';
import 'tachyons';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
    return (
        <React.StrictMode>
            <div className='ma4 mt0'>
                <Tilt className='Tilt br2 shadow-2' options={{ max: 55 }} style={{ height: 150, width: 150 }}>
                    <div className='Tilt-inner pa3'>
                        <img src={brain} alt='Brain' />
                    </div>
                </Tilt>
            </div>
        </React.StrictMode>
    );
};

export default Logo;
