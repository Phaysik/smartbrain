import React from 'react';
import './Navigation.css';
import 'tachyons';

const Navigation = ({ onRouteChange, signedIn }: { onRouteChange: any; signedIn: boolean; }) => {
    return (
        <React.StrictMode>
            {
                signedIn
                    ? <nav>
                        <p
                            onClick={() => onRouteChange('signout')}
                            className='f3 link dim black underline pa3 pointer'
                        >
                            Sign Out
                        </p>
                    </nav>
                    :
                    (
                        <nav>
                            <p
                                onClick={() => onRouteChange('signin')}
                                className='f3 link dim black underline pa3 pointer'
                            >
                                Sign In
                            </p>
                            <p
                                onClick={() => onRouteChange('register')}
                                className='f3 link dim black underline pa3 pointer'
                            >
                                Register
                            </p>
                        </nav>
                    )
            }
        </React.StrictMode >
    );
};

export default Navigation;
