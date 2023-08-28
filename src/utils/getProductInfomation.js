import realm from '../store/realm';

export const getProductImage = (productId) => {
    const { images } = realm.objects('Product').filtered(`id == ${productId}`)[0];
    return images[0].link;
};

export const getProductName = (productId) => {
    const { name } = realm.objects('Product').filtered(`id == ${productId}`)[0];
    return name;
};

export const getProductPrice = (productId) => {
    const { price } = realm.objects('Product').filtered(`id == ${productId}`)[0];
    return price;
};

export const getProductIsLike = (productId) => {
    const { isLike } = realm.objects('Product').filtered(`id == ${productId}`)[0];
    return isLike;
};

export const getSelectedSize = (sizeId) => {
    const { size } = realm.objects('Size').filtered(`id == ${sizeId}`)[0];
    return size;
};

export const getPriceByQuantity = (productId, quantity) => {
    const { price } = realm.objects('Product').filtered(`id == ${productId}`)[0];
    return price * quantity;
};