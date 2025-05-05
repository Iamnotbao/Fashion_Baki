import React from 'react';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';


const GoogleAuthentication = ({ setToken }) => {

    return (
        <GoogleLogin
            onSuccess={credentialResponse => {
                console.log(credentialResponse);
                setToken(credentialResponse.credential);
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />
     
    );
};

export default GoogleAuthentication;