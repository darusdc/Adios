export const Product = {
    name: 'Product',
    properties: {
        id: 'int',
        idCategory: 'int',
        idGender: 'int',
        idBrand: 'int',
        name: 'string',
        price: 'float',
        images: { type: 'list', objectType: 'ProductImage' },
        description: 'string',
        isLike: 'bool',
    },
    primaryKey: 'id',
};

export const ProductImage = {
    name: 'ProductImage',
    embedded: true,
    properties: {
        id: 'int',
        link: 'string',
    },
};
