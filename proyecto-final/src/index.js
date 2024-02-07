import express from 'express';
import handlebars from 'express-handlebars'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { databaseConnection } from './dao/db/index.js'
import { productsRouter } from './routes/products.router.js';
import { cartsRouter } from './routes/carts.router.js';
import { viewsRouter } from './routes/views.router.js';

//FileSystem
// import { CartManager } from './dao/fileManagers/cartManager.js';
// import { ProductManager } from './productManager.js';
//export const productManager = new ProductManager;
//export const cartManager = new CartManager;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//HANDLEBARS
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');


app.use(express.json())
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/views', viewsRouter)

app.listen(process.env.PORT||8080, (req, res) => {
    console.log(`listening on port ${process.env.PORT || 8080}`);
    databaseConnection()
})