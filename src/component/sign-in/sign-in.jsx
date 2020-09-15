import React, {Component} from 'react';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.scss';

class SignIn extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        console.log("submitting");
        event.preventDefault();
        const {email, password} = this.state;

        try {
            auth.signInWithEmailAndPassword(email, password);
            this.setState({
                email:'',
                password:''
            })
        }
        catch(error)
        {
            console.log(error);
        }
        
    }

    handleChange = event => {
        const {value, name} = event.target;

        this.setState({ [name]: value });
    }

    render(){
        return(
            <div className="sign-in">
                <h2 className='title'>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        name="email" 
                        type="email" 
                        handleChange={this.handleChange} 
                        label="email"
                        value={this.state.email} required/>
                    
                    <FormInput name="password" 
                        type="password" 
                        handleChange={this.handleChange} 
                        label="password"
                        value={this.state.password} required/>
                    <div className='buttons'>
                        <CustomButton type="submit">
                            Sign in    
                        </CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                            {''}
                            Sign in with Google{''}
                        </CustomButton>
                    </div>
                    
                </form>
            </div>
        )
    }
}


export default SignIn;
// export default connect(null,mapDispatchToProps)(SignIn);