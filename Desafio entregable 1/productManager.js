class Product {
    id
    title
    description
    price
    thumbnail
    code
    stock

    constructor({ id, title, description, price, thumbnail, code, stock }) {
        this.id = id,
        this.title = title,
        this.description = description,
        this.price = price,
        this.thumbnail = thumbnail
        this.code = code,
        this.stock = stock
    }
}

class ProductManager {

    static proxIdProduct = 1
    products

    constructor() {
        this.products = []
    }

    static getIdForNewProduct() {
        return ProductManager.proxIdProduct++
    }

    addProduct(data) {

        const { title, description, price, thumbnail, code, stock } = data;

        const productExist = this.products.find(p => p.code === code)

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log('You must fill all the required fields');
        } else if (productExist) {
            console.log(`Product whit code ${code} already exists`);
        } else {
            const idProduct = ProductManager.getIdForNewProduct()
            const product = new Product({ id: idProduct, ...data });
            this.products.push(product)
        }

    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);

        if (product) {
            return product;
        } else {
            console.log(`Product ${id} not found`)
        }
    }
}


const manejadorDeProductos = new ProductManager()

manejadorDeProductos.addProduct({
    title: 'Duke 200',
    description: 'Moto KTM Duke 200',
    price: 4000,
    thumbnail: './assets/duke200',
    code: 'mt01',
    stock: 1
})

manejadorDeProductos.addProduct({
    title: 'Honda CB190R',
    description: 'Moto Honda CB190R',
    price: 3000,
    thumbnail: './assets/hondacb190',
    code: 'mt02',
    stock: 1
})

console.log('##### Todos los productos #####')
console.log(manejadorDeProductos.getProducts());

console.log('##### Producto por ID #####')
console.log(manejadorDeProductos.getProductById(1));