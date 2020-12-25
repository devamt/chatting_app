import { Button } from '@material-ui/core';
import React from 'react';
import './Login.css';
import {auth,provider} from './Firebase';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

function Login() {
    const [{},dispatch] = useStateValue();

    const signIn= () => {
        auth
            .signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type : actionTypes.SET_USER,
                    user : result.user,
                });
            })
            .catch((error) => alert(error.message));
    };
    return (
        <div className="login">
            <div className="login__container">
                <img src="data:image/png;base64,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" alt="" />
                <div className="login__text">
                    <h1> Sign In To WhatsApp </h1>
                </div>

                <Button onClick={signIn}> Sign In with Google </Button>
            </div>
        </div>
    )
}

export default Login;
