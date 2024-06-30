import express from 'express';
import handlebars from 'express-handlebars'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { databaseConnection } from './dao/db/index.js'
import { productsRouter } from './routes/products.router.js';
import { cartsRouter } from './routes/carts.router.js';
import { viewsRouter } from './routes/views.router.js';
import { sessionRouter } from './routes/sessions.router.js';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { initPassport } from './config/passport.config.js';
import passport from 'passport';
import { program } from './config/commander.config.js';
import compression from 'express-compression';
import { addLogger } from './middlewares/logger.middleware.js';
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

//FileSystem
//import { CartManager } from './dao/fileManagers/cartManager.js';
//import { ProductManager } from './productManager.js';
//export const productManager = new ProductManager;
//export const cartManager = new CartManager;

const app = express();
const server = createServer(app)

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.1',
      info: {
        title: 'E-commerce API',
        description: 'API documentation E-commerce project',
      }
    },
    apis: [`${__dirname}/docs/**/*.yaml`], // Ruta a tus archivos de rutas
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//HANDLEBARS
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
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
app.use(compression())
initPassport()
app.use(passport.initialize())
app.use(passport.session())

app.use(addLogger)

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/views', viewsRouter)
app.use('/api/session', sessionRouter)

app.get('/', (req, res) => {
    res.send('Hola Mundo')
})

app.get('/loggerTest', (req, res) => {
    req.logger.debug(`Method:${req.method} - URL:${req.url} - ${new Date().toLocaleString()}`)
    req.logger.http(`Method:${req.method} - URL:${req.url} - ${new Date().toLocaleString()}`)
    req.logger.info(`Method:${req.method} - URL:${req.url} - ${new Date().toLocaleString()}`)
    req.logger.warning(`Method:${req.method} - URL:${req.url} - ${new Date().toLocaleString()}`)
    req.logger.error(`Method:${req.method} - URL:${req.url} - ${new Date().toLocaleString()}`)
    req.logger.fatal(`Method:${req.method} - URL:${req.url} - ${new Date().toLocaleString()}`)

    res.send('Loggers created successfully')
})


//SOCKET
export const io = new Server(server)


server.listen(program.opts().p, (req, res) => {
    console.log(`listening on port http://localhost:${program.opts().p}`);
    databaseConnection()
})