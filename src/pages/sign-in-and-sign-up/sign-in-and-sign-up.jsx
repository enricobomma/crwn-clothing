import React from 'react'
import SignIn from '../../component/sign-in/sign-in.jsx';
import SignUp from '../../component/sign-up/sign-up';

import './sign-in-and-sign-up.scss';

const SignInAndSignup = () => (
    <div className="sign-in-and-sign-up">
        <SignIn/>
        <SignUp/>
    </div>
);

export default SignInAndSignup;


