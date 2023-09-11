export const Order = {
    name: 'Order',
    properties: {
        id: 'int',
        idUser: 'int',
        idShipping: 'int',
        totalPrice: 'float',
        deliveryFee: 'float',
        serviceFee: 'float',
        date: 'date',
    },
    primaryKey: 'id',
};