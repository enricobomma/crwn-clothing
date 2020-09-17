import React from 'react';
import './checkout-item.style.scss';
import { clearItemfromCart, removeItem, addItemAction } from '../../redux/cart/cart.actions';

import {connect} from 'react-redux';

const CheckoutItem = ({cartItem, dispatch}) => {
    const {name, quantity, price, imageUrl} = cartItem;
    return(
        <div className='checkout-item'>
        <div className='image-container'>
            <img alt='item' src={imageUrl}/>
        </div>
        <span className='name'>{name}</span>
        <span className='quantity'>
            <div onClick={()=> dispatch(removeItem(cartItem))} className='arrow'>&#10094;</div>
            <span className='value'> 
            {quantity}
            </span>
            <div onClick={()=>dispatch(addItemAction(cartItem))} className='arrow'>&#10095;</div>
        </span>
        <span className='price'>{price}</span>
        <div className='remove-button' onClick={()=> dispatch(clearItemfromCart(cartItem))}>&#10005;</div>
    </div>
    )
   
};

// const mapDispatchToProps = () => {
//     return (

//     )
// }

export default connect()(CheckoutItem);