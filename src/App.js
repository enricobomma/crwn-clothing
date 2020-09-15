import React , {Component} from 'react';
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop.jsx';
import Header from './component/header/header';
import SignInAndSignupPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.jsx';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions';
import { auth , createUserProfileDocument } from './firebase/firebase.utils';

import './App.css';

class App extends Component {
  // constructor(){
  //   super();
  //   this.state = {
  //     currentUser: null
  //   }
  // }

  unsubscribeFromAuth = null;

  componentDidMount(){

    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      console.log("userAuth",userAuth);
      if(userAuth) {
        const userRef =  await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
            setCurrentUser({
              'id': snapshot.id,
              ...snapshot.data()
            });
        });
       
      }
      else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="">
        <Header/>
        <Switch>
          <Route exact={true} path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route 
          exact 
          path='/signup' 
          render= {()=> 
            this.props.currentUser ? (<Redirect to='/'/>) : (<SignInAndSignupPage/>)}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
