import React, {Component} from 'react';
import  {connect} from 'react-redux';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

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
        event.preventDefault();
        const {email, password} = this.state;
        const {emailSignInStart} = this.props;
        emailSignInStart(email, password);
    }

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({ [name]: value });
    }
    
    render(){
        const {googleSignInStart, error} =  this.props;

        if(error) 
            alert("Authentication error with email and password\n"+ error.message);

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
                        <CustomButton 
                        type="button" onClick={googleSignInStart} isGoogleSignIn>
                            {''}
                            Sign in with Google{''}
                        </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

const mapStateToProps = (state) => ({
    error: state.user.error
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);