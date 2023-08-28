import realm from '../store/realm';

export const countProductCart = (userId) => {
    const productCart = realm.objects('Cart').filtered(`idUser == ${userId}`);
    let currentProductCart = 0;

    if (productCart.length !== 0) {
        productCart.forEach((item) => {
            currentProductCart += item.quantity;
        });
    }

    return currentProductCart;
};