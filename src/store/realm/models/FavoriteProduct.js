export const FavoriteProduct = {
    name: 'FavoriteProduct',
    properties: {
        id: 'int',
        idUser: 'int',
        idProducts: 'int<>',
    },
    primaryKey: 'id',
};