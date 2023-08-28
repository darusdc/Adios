const intialState = {
    productCartAmount: 0,
};
    
export const productCartAmountReducer = (state = intialState, action) => {
    if (action.type === 'ADD_PRODUCT_CART_AMOUNT') {
        const currentAmount = action.payload;
    
        return {
            ...state,
            productCartAmount: currentAmount,
        }
    }
    return state;
};