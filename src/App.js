import React , {Component} from 'react';
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop.jsx';
import Header from './component/header/header';
import SignInAndSignup from './pages/sign-in-and-sign-up/sign-in-and-sign-up.jsx';
import {Route, Switch} from 'react-router-dom';
import { auth , createUserProfileDocument } from './firebase/firebase.utils';

import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      console.log("userAuth",userAuth);
      if(userAuth) {
        const userRef =  await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          console.log("snapshot", snapshot.data());
          this.setState({
            currentUser: {
              'id': snapshot.id,
              ...snapshot.data()
            }
          });

          console.log("App state ",this.state);
        });
       
      }
      else {
        this.setState({currentUser: userAuth});
      }
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="">
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact={true} path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route path='/signup' component={SignInAndSignup}/>
        </Switch>
      </div>
    );
  }
}

export default App;
