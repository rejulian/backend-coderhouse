import { promises as fs } from "fs"
import { v4 as uuidv4 } from 'uuid';

export class ProductManager {
    constructor() {
        this.products = [];
        this.path = 'src/models/products.json'
    }

    getProducts = async () => {
        const products = await fs.readFile(this.path, 'utf8');
        const productsJSON = JSON.parse(products);
        return productsJSON;
    }

    getProductById = async (id) => {
        const products = await this.getProducts();
        const product = products.find(product => product.id === id);
        if (product) {
            return product
        } else {
            null
        }
    }

    addProduct = async ({ title, description, price, thumbnail, code, stock, status, category }) => {
        const id = uuidv4();
        let newProduct = { id, title, description, price, thumbnail, code, stock, status, category }
        this.products = await this.getProducts()
        this.products.push(newProduct);
        await fs.writeFile(this.path, JSON.stringify(this.products))
        return newProduct;
    }

    updateProduct = async (id, {...data}) => {
        const products = await this.getProducts()
        const index = products.findIndex(product => product.id === id)

        if(index !== -1){
            products[index] = {id,...data}
            await fs.writeFile(this.path, JSON.stringify(products))
            return products[index]
        } else{
            null
        }
    }

    deleteProductById = async (id) => {
        const products = await this.getProducts()
        const index = products.findIndex(product => product.id === id)

        if (index !== -1) {
            products.splice(index, 1);
            await fs.writeFile(this.path, JSON.stringify(products))
            return 'Product deleted successfully'
        } else {
            null
        }
    }
}
