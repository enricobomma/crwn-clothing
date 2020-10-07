import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import CartIcon from '../card-icon/card-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {ReactComponent as Logo} from '../../assets/crown.svg'
import {createStructuredSelector} from 'reselect';
import { selectCurrentUser} from '../../redux/user/user.selectors'
import {selectCartHidden} from '../../redux/cart/cart.selector';
import {signOutStart} from '../../redux/user/user.actions';
import './header.scss';

const Header = ({currentUser, hidden, signOutStart}) => (

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
                <div className='option' onClick={signOutStart}>SIGN OUT</div>
                :
                <Link className='option' to='/signup'>SIGN IN</Link>
            }
            <CartIcon/>
        </div>
        {
            hidden ? null : <CartDropdown/>
        }
        
    </div>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);