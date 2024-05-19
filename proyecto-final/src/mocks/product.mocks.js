import { faker } from "@faker-js/faker/locale/es";

export const generateProduct = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        thumbnail: faker.image.avatar(),
        category: faker.commerce.department(),
        code: faker.string.alphanumeric({length:20}),
        stock: faker.number.int({min:0, max:100}),
        status: faker.datatype.boolean()
    }
}