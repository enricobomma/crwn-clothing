import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../card-icon/card-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {ReactComponent as Logo} from '../../assets/crown.svg'
import './header.scss';

const Header = ({currentUser, cart}) => (

    <div className='header'>
        <Link className="logo-container" to='/'>
            <Logo className="logo"/>
        </Link>
        <div className="options">
            <Link className="option" to="/shop">
                SHOP
            </Link>
            <Link className="option" to="/contact">
                CONTACT
            </Link>
            {
                currentUser ? 
                <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                :
                <Link className='option' to='/signup'>SIGN IN</Link>
            }
            <CartIcon/>
        </div>
        {
            cart ? null : <CartDropdown/>
        }
        
    </div>
)

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    cart: state.cart.hidden
});

export default connect(mapStateToProps)(Header);