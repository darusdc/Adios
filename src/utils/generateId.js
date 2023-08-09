import realm from '../store/realm';

export const generateId = (tableName) => {
    const data = realm.objects(tableName);
    const dataAmount = data.length;

    const newId = dataAmount !== 0 ? data[dataAmount - 1].id + 1 : 1;

    return newId;
};