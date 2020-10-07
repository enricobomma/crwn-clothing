import React from 'react'
import CustomButton from '../custom-button/custom-button';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import {connect} from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selector';
import { withRouter } from 'react-router-dom';
import CartItem from '../cart-item/cart-item.component';
import { createStructuredSelector} from 'reselect';
import {compose} from 'redux';
import './cart-dropdown.style.scss';

const CartDropdown = ({cartItems, history, dispatch}) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.length ? (
                    cartItems.map(cartItem => 
                    <CartItem key={cartItem.id} item={cartItem}/>)
                )
                :
                <span className='empty-message'> Your cart is empty</span>
            }
        </div>
        <CustomButton
            onClick={()=> {
                history.push('/checkout');
                dispatch(toggleCartHidden())}
            }>GO TO CHECKOUT</CustomButton>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});



export default compose(
    withRouter,
    connect(mapStateToProps)
)(CartDropdown);