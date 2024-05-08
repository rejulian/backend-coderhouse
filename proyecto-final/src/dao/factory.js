// import mongoProductManager from '../controllers/product.controller'
import {MongoProductManager} from './mongoManagers/mongoProductManager.js'
import {MongoCartManager} from './mongoManagers/mongoCartManager.js'
import {ProductManager} from './fileManagers/productManager.js'
import {CartManager} from './fileManagers/cartManager.js'
import { program } from '../config/commander.config.js'

export let Products;
export let Carts;

switch(program.opts().s){
    case "MONGO":
        Products = MongoProductManager
        Carts = MongoCartManager
    break;
    case "FILE":
        Products = ProductManager
        Carts = CartManager
    break;
}