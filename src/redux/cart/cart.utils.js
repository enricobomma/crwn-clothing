export const addItemtoCart = (cartItems, cartItemToAdd ) => {
    const existingItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id);

    if(existingItem) {
        return cartItems.map(cartItem =>
             cartItem.id === cartItemToAdd.id ?
             {...cartItem, quantity: existingItem.quantity+1} :cartItem)
    }

    return [...cartItems, {...cartItemToAdd, quantity: 1}];
}