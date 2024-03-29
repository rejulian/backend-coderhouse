import express from 'express';
import handlebars from 'express-handlebars'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { databaseConnection } from './dao/db/index.js'
import { productsRouter } from './routes/products.router.js';
import { cartsRouter } from './routes/carts.router.js';
import { viewsRouter } from './routes/views.router.js';
import { sessionRouter } from './routes/sessions.router.js';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { MongoProductManager } from './dao/mongoManagers/mongoProductManager.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';

//FileSystem
//import { CartManager } from './dao/fileManagers/cartManager.js';
//import { ProductManager } from './productManager.js';
//export const productManager = new ProductManager;
//export const cartManager = new CartManager;

const app = express();
const server = createServer(app)

export const mongoProductManager = new MongoProductManager();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//HANDLEBARS
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');


app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        ttl: 15
    }),
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/views', viewsRouter)
app.use('/api/session', sessionRouter)

app.get('/', (req, res) => {
    res.send('Hola Mundo')
})

//SOCKET
export const io = new Server(server)


server.listen(process.env.PORT || 8080, (req, res) => {
    console.log(`listening on port http://localhost:${process.env.PORT || 8080}`);
    databaseConnection()
})