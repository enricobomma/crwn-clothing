import CartActionType from './cart.type';
import {addItemtoCart} from './cart.utils';

const INITIAL_STATE = {
    hidden: true,
    cartItems: []

}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CartActionType.TOGGLE_CART_HIDDEN:
            console.log("arrivato")
            return {
                ...state,
                hidden: !state.hidden
            }
        case CartActionType.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemtoCart(state.cartItems, action.payload) 
            }
        default:
            return state;
    }
}

export default cartReducer;