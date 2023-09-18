export const addGenderFilter = (value) => {
    return {
        type: 'ADD_GENDER_ID',
        payload: value
    }
};

export const addCategoryFilter = (value) => {
    return {
        type: 'ADD_CATEGORY_ID',
        payload: value
    }
}

export const addBrandFilter = (value) => {
    return {
        type: 'ADD_BRAND_ID',
        payload: value
    }
}