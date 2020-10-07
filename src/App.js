import React , {Component} from 'react';
//Pages
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop.jsx';
import CheckOutPage from './pages/checkout/checkout.component';
//Components
import Header from './component/header/header';
import SignInAndSignupPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.jsx';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {selectCurrentUser} from './redux/user/user.selectors';
import {createStructuredSelector} from 'reselect'

//Action
import {checkUserSession} from './redux/user/user.actions'
import './App.css';

class App extends Component {

  unsubscribeFromAuth = null;

  componentDidMount(){
    const {checkUserSession} = this.props;
    checkUserSession();
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      
    //   if(userAuth) {
    //     const userRef =  await createUserProfileDocument(userAuth);

    //     userRef.onSnapshot(snapshot => {
    //         setCurrentUser({
    //           'id': snapshot.id,
    //           ...snapshot.data()
    //         });
    //     });
       
    //   }
    //   else {
    //     setCurrentUser(userAuth);
    //   }
    //   // addCollectionAndDocuments('collections',collectionsArray.map(({title, items}) => ({title, items})));
    // });
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
          <Route exact path='/checkout' component={CheckOutPage}/>
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

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionsArray: selectCollectionForPreview
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
