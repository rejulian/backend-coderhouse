import express from 'express';
import { ProductManager } from './controllers/ProductManager.js'
import { CartManager } from './controllers/CartManager.js'
import { productRouter } from './routes/procucts.router.js';
import { cartRouter } from './routes/carts.router.js';
import { viewsRouter } from './routes/views.router.js';
import { engine } from 'express-handlebars';
import * as path from 'path';
import __dirname from './utils.js';

const app = express();
const PORT = 8080;

export const productManager = new ProductManager();
export const cartManager = new CartManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//HANDLEBARS
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname + '/views'))

//STATIC
app.use('/', express.static(__dirname + '/public'))

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/views', viewsRouter)

app.listen(PORT, (req, res) => {
    console.log(`Server running on port ${PORT}`);
});