import { expect } from 'chai';
import supertest from 'supertest';
import mongoose from "mongoose";

const port = 8080;

const requester = supertest(`http://localhost:${port}`);

mongoose.connect(process.env.MONGO_URI);

describe('Testing ecommerce App', () => {

    describe("Testing products api", () => {

        let cookie;
        let idProduct;

        it("Logue usuario: Es necesario para poder crear un producto", async () => {
            //Given
            const mockLogin = {
                email: 'adminCoder@coder.com',
                password: 'adminCod3r123'
            }
            //Then
            const result = await requester.post('/api/session/login').send(mockLogin);
            // console.log(result);
            const cookieResult = result.header['set-cookie'][0];
            const cookieData = cookieResult.split('=')
            cookie = {
                name: cookieData[0],
                value: cookieData[1]
            }

            //Assert
            expect(cookie.name).is.eqls('connect.sid');
            expect(cookie.value).is.ok;
        })

        it("Crea un producto: El api post /api/products debe crear un producto", async () => {
            //Given  -  Ejemplo mockeado
            const productsMock = {
                "title": "Pizza Test Mocha",
                "description": "Pizza creada desde test!!",
                "code": "pz-test-01",
                "price": 10000,
                "status": true,
                "stock": 10,
                "category": "pizza",
                "thumbnail": "https://assets.elgourmet.com/wp-content/uploads/2023/03/pizza_Mh3H4eanyBKEsStv1YclPWTf9OUqIi.png"
            }

            //Then
            const { statusCode, _body } = await requester
                .post('/api/products')
                .send(productsMock)
                .set('Accept', 'application/json')
                .set('cookie', [`${cookie.name}=${cookie.value}`]);

            // console.log(_body);

            //Assert
            expect(_body).is.ok.and.to.have.property('_id');
            expect(_body.status).is.eqls(true);

            idProduct = _body._id;
        });

        it("Trae productos: El api get /api/products debe trer una lista de productos", async () => {
            //Given  -  Ejemplo mockeado

            //Then
            const { statusCode, _body } = await requester.get('/api/products').set('cookie', [`${cookie.name}=${cookie.value}`]);
            // console.log(result);

            //Assert
            expect(statusCode).is.eqls(200);
            expect(_body.payload).to.be.an('array');
        });

        it("Trae un producto: El api get /api/products/:pid debe trer un producto", async () => {
            //Given  -  Ejemplo mockeado

            //Then
            const { statusCode, _body } = await requester.get(`/api/products/${idProduct}`);
            // console.log(result);

            //Assert
            expect(statusCode).is.eqls(200);
            expect(_body._id).is.equal(idProduct);
        });

    });
});