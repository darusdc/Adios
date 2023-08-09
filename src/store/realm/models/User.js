export const User = {
    name: "User",
    properties: {
        id: 'int',
        name: 'string',
        email: 'string',
        phone: 'string',
        password: 'string',
        profileImage: 'string',
    },
    primaryKey: 'id',
}

export const UserLoginId = {
    name: 'UserLoginId',
    properties: {
        userId: 'int',
    },
    primaryKey: 'userId',
}

