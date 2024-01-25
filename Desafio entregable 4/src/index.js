import express from 'express';
import handlebars from 'express-handlebars';
import { ProductManager } from './controllers/ProductManager.js';
import { CartManager } from './controllers/CartManager.js';
import { productRouter } from './routes/procucts.router.js';
import { cartRouter } from './routes/carts.router.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const PORT = 8080;

export const productManager = new ProductManager();
export const cartManager = new CartManager();

// PUBLIC
app.use(express.static(__dirname + '/public'));

// HANDLEBARS
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTES
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

//SOCKET
const io = new Server(server)
io.on('connection', async (socket) => {
    console.log('a user connected');

    const products = await productManager.getProducts()

    socket.emit('products', products)

    socket.on('newProduct', (data) => {
        console.log(data);
        productManager.addProduct(data)
    })
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
