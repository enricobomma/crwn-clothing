import React from 'react'
import './checkout.style.scss';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCartItems, selectCartItemsTotal} from '../../redux/cart/cart.selector';
import CheckoutItem from '../../component/checkout-item/checkout-item.component';

const CheckOutPage = ({cartItems, total}) => (
    <div className='checkout-page'>
        <div className="checkout-header">
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Descriptio</span>
            </div>
            <div className='header-block'>
                <span>Qantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
        </div>
        {cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem}/>)}
        <div className='total'>
            <span>TOTAL ${total}</span>
        </div>
    </div>
) 

const mapStatetoProps = createStructuredSelector({
    cartItems: selectCartItems, 
    total: selectCartItemsTotal
})

export default connect(mapStatetoProps)(CheckOutPage);