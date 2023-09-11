import Realm from 'realm';
import { Brand } from './models/Brand';
import { Gender } from './models/Gender';
import { Category } from './models/Category';
import { Size } from './models/Size';
import { Shipping } from './models/Shipping';
import { Product, ProductImage } from './models/Product';
import { User, UserLoginId } from './models/User';
import { FavoriteProduct } from './models/FavoriteProduct';
import { Cart } from './models/Cart';
import { Order } from './models/Order';
import { OrderDetail } from './models/OrderDetail';

const realm = new Realm({
    schema: [
        Brand,
        Gender,
        Category,
        Size,
        Shipping,
        Product,
        ProductImage,
        User,
        UserLoginId,
        FavoriteProduct,
        Cart,
        Order,
        OrderDetail
    ],
    deleteRealmIfMigrationNeeded: true,
});



export default realm;