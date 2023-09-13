const intialState = {
    genderId: 0,
};

export const productFilterReducer = (state = intialState, action) => {
    if (action.type === 'ADD_GENDER_ID') {
        const newGenderId = action.payload;

        return {
            ...state,
            genderId: newGenderId,
        }
    }

    return state;
};