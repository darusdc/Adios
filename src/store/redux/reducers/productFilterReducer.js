const intialState = {
    genderId: 0,
    categoryId: 0,
    brandId: 0
};

export const productFilterReducer = (state = intialState, action) => {
    if (action.type === 'ADD_GENDER_ID') {
        const newGenderId = action.payload;

        return {
            ...state,
            genderId: newGenderId,
        }
    } else if (action.type === "ADD_CATEGORY_ID") {
        const newCategoryId = action.payload

        return {
            ...state,
            categoryId: newCategoryId
        }
    } else if (action.type === "ADD_BRAND_ID") {
        const newBrandId = action.payload

        return {
            ...state,
            brandId: newBrandId
        }
    }


    return state;
};