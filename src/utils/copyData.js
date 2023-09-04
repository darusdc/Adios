export const copyObject = (objectName) => {
    let item = {};

    for (let key in objectName) {
        item[key] = objectName[key];
    }

    return item;
};

export const copyArrayOfObjects = (arrayName) => {
    let newArray = [];

    arrayName.forEach((item) => {
        let newSingleObject = {};

        for (let key in item) {
            newSingleObject[key] = item[key];
        }

        newArray.push(newSingleObject);
    });

    return newArray;
};