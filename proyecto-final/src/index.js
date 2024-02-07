import express from 'express';
import { databaseConnection } from './dao/db/index.js'
import { productsRouter } from './routes/products.router.js';
import { cartsRouter } from './routes/carts.router.js';

//FileSystem
// import { CartManager } from './dao/fileManagers/cartManager.js';
// import { ProductManager } from './productManager.js';
//export const productManager = new ProductManager;
//export const cartManager = new CartManager;

const PORT = 8080;
const app = express();

app.use(express.json())
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.listen(PORT, (req, res) => {
    console.log(`listening on port ${PORT}`);
    databaseConnection()
})