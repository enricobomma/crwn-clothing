import CartActionType from './cart.type';
import CartActiontype from './cart.type';

export const toggleCartHidden = () => ({
    type: CartActiontype.TOGGLE_CART_HIDDEN
});

export const addItemAction = (item) => ({
    type: CartActionType.ADD_ITEM,
    payload: item
});

export const clearItemfromCart = (item) => ({
    type:CartActionType.CLEAR_ITEM_FROM_CART,
    payload: item
})

export const removeItem = (item) => ({
    type:CartActionType.REMOVE_ITEM,
    payload: item
})