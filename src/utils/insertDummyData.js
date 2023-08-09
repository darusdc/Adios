import realm from '../store/realm';
import { brandData } from '../data/brandDummyData';
import { genderData } from '../data/genderDummyData';
import { categoryData } from '../data/categoryDummyData';
import { sizeData } from '../data/sizeDummyData';
import { shippingData } from '../data/shippingDummyData';
import { productData } from '../data/productDummyData';

export const insertDummyData = (modelName, data) => {
    // check the existence of dummy data on DB
    // const brandDB = realm.objects('Brand');
    // const genderDB = realm.objects('Gender');
    // const categoryDB = realm.objects('Category');
    // const sizeDB = realm.objects('Size');
    // const shippingDB = realm.objects('Shipping');
    // const productDB = realm.objects('Product');
    const modelDB = realm.objects(modelName);

    if (!modelDB.length){
        realm.write(() => {
            data.forEach((item) => {
                realm.create(modelName, 
                    item
                )
            });
        })
    }
    // if dummy data are not exist, insert to DB
    // if (!brandDB.length && !genderDB.length && !categoryDB.length && !sizeDB.length && !shippingDB.length && !productDB.length) {
    //     realm.write(() => {
    //         brandData.forEach((item) => {
    //             realm.create('Brand', {
    //                 id: item.id,
    //                 brandName: item.brandName,
    //                 logo: item.logo,
    //                 thumbnail: item.thumbnail,
    //             });
    //         });

    //         genderData.forEach((item) => {
    //             realm.create('Gender', {
    //                 id: item.id,
    //                 genderName: item.genderName,
    //                 thumbnail: item.thumbnail,
    //             });
    //         });

    //         categoryData.forEach((item) => {
    //             realm.create('Category', {
    //                 id: item.id,
    //                 shoeCategory: item.category,
    //                 thumbnail: item.thumbnail,
    //             });
    //         });

    //         sizeData.forEach((item) => {
    //             realm.create('Size', {
    //                 id: item.id,
    //                 size: item.size,
    //                 isSelected: item.isSelected,
    //             });
    //         });

    //         shippingData.forEach((item) => {
    //             realm.create('Shipping', {
    //                 id: item.id,
    //                 shippingName: item.shippingName,
    //                 terms: item.terms,
    //                 deliveryFee: item.deliveryFee,
    //                 isSelected: item.isSelected,
    //             });
    //         });

    //         productData.forEach((item) => {
    //             realm.create('Product', {
    //                 id: item.id,
    //                 idCategory: item.idCategory,
    //                 idGender: item.idGender,
    //                 idBrand: item.idBrand,
    //                 name: item.name,
    //                 price: item.price,
    //                 images: item.images,
    //                 description: item.description,
    //                 isLike: item.isLike,
    //                 sizes: item.sizes,
    //                 shippingTerms: item.shippingTerms,
    //             });
    //         });
    //     });
    // }
};
