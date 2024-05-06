// import mongoProductManager from '../controllers/product.controller'
import {MongoProductManager} from './mongoManagers/mongoProductManager.js'
import {ProductManager} from './fileManagers/productManager.js'

export let Products;

switch(process.env.PERSISTENCE){
    case "MONGO":
        Products = MongoProductManager
    break;
    case "FILE":
        Products = ProductManager
    break;
}