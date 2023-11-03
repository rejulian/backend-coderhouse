import { promises as fs } from 'fs';

export class ProductManager {
    static id = 0;

    constructor() {
        this.path = 'products.json'
        this.products = []
    }

    addProduct = async ({ title, description, price, thumbnail, code, stock, status, category }) => {
        ProductManager.id++;
        let newProduct =  { id: ProductManager.id, title, description, price, thumbnail, code, stock, status, category  }
        this.products.push(newProduct);
        await fs.writeFile(this.path, JSON.stringify(this.products))
        return newProduct;
    }

    getProducts = async () => {
        const response = await fs.readFile(this.path, 'utf8')
        const responseJSON = JSON.parse(response)
        return responseJSON
    }

    getProductById = async (id) => {
        const response = await fs.readFile(this.path, 'utf8')
        const responseJSON = JSON.parse(response)

        const product = responseJSON.find(product => product.id === id)

        if (product){
            return product
        } else {
            console.log('Producto no encontrado');
        }
    }

    updateProduct = async (id, {...data}) => {
        const response = await fs.readFile(this.path, 'utf8')
        const responseJSON = JSON.parse(response)

        const index = responseJSON.findIndex(product => product.id === id)

        if(index !== -1){
            responseJSON[index] = {id, ...data}
            await fs.writeFile(this.path, JSON.stringify(responseJSON))
            return responseJSON[index]
        } else{
            console.log('Producto no encontrado');
        }
    }

    deleteProduct = async (id) => {
        const response = await fs.readFile(this.path, 'utf8')
        const responseJSON = JSON.parse(response)

        const index = responseJSON.findIndex(product => product.id === id)

        if(index !== -1) {
            responseJSON.splice(index, 1);
            await fs.writeFile(this.path, JSON.stringify(responseJSON))
        }else{
            console.log('producto no encontrado');
        }
    }
}