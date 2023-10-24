import { promises as fs } from "fs"

class ProductManager {

  static id = 0

  constructor() {
    this.path = "./products.txt"
    this.products = []
  }

  async writeProducts() {
    await fs.writeFile(this.path, JSON.stringify(this.products));
  }
 
  addProduct = async ({ title, description, price, thumbnail, code, stock }) => {
    ProductManager.id++
    
    let newProduct = { id: ProductManager.id, title, description, price, thumbnail, code, stock }
    this.products.push(newProduct)
    
    await this.writeProducts()
  }

  readProducts = async () => {
    let response = await fs.readFile(this.path, "utf-8")
    let responseJSON = JSON.parse(response)

    return responseJSON
  }
  
  getProducts = async () => {
    let response = await this.readProducts()
    console.log(response);
  }

  getProductById = async (id) => {
    let response = await this.readProducts()

    const product = response.find(p => p.id === id);

    if (product) {
      console.log(product);
    } else {
      console.log(`Product ${id} not found`)
    }
  }

  deleteProductById = async (id) => {
    let response = await this.readProducts();

    const index = response.findIndex((p) => p.id === id);
    if (index !== -1) {
      response.splice(index, 1);
      await fs.writeFile(this.path, JSON.stringify(response))
    }
  }

  updateProduct = async (id, {...data}) => {

    let response = await this.readProducts();

    const index = response.findIndex((p) => p.id === id);

    if (index !== -1) {
      response[index] = { id, ...data };
      await fs.writeFile(this.path, JSON.stringify(response))
    } else {
      console.log("Producto no encontrado");
    }
  }

}

const products = new ProductManager;

products.addProduct({title: 'KTM DUKE 200',description: 'MOTO KTM DUKE 200',price: 2000,thumbnail : './assets/ktm200.jpg',code:  'mt01',stock : 1})

products.addProduct({title: 'HONDA CB190R',description: 'MOTO HONDA CB190R',price: 1000,thumbnail : './assets/honda190r.jpg',code:  'mt02',stock : 1})

// products.getProducts();

// products.getProductById(2);

// products.updateProduct(1, {
//   title: 'KTM DUKE 200',
//   description: 'MOTO KTM DUKE 200',
//   price: 4000,
//   thumbnail: './assets/ktm200.jpg',
//   code: 'mt01',
//   stock: 1
// })

// products.deleteProductById(2)