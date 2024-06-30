import { expect } from 'chai';
import supertest from 'supertest';
import mongoose from "mongoose";

const port = 8080;

const requester = supertest(`http://localhost:${port}`);

mongoose.connect(process.env.MONGO_URI);

describe("Testing ecommerce app", () => {

    describe("Testing carts api", () => {

        let cookie;
        let idCart;
        let idProduct = "6681a8b886cf6ad45390558f";
        const userMock = {
            first_name: "Pablo",
            last_name: "Re",
            email: "pablore123@gmail.com",
            age: 55,
            password: "123456",
        };

        it("Crear nuevo usuario: /api/session/register debe crear un nuevo usuario", async () => {

            //Given
            

            //Then
            const {statusCode, _body} = await requester.post("/api/session/register").send(userMock);
            // console.log(result);

            //Assert
            expect(statusCode).is.eqls(200);
            expect(_body).is.ok.and.to.have.property('_id');

            idCart = _body.cart_id
        });

        it("Loguear un usuario: /api/session/login debe devolver informacion del usuario logueado", async () => {

            //Given
            const mockLogin = {
                email: userMock.email,
                password: userMock.password
            }

            //Then
            const result = await requester.post("/api/session/login").send(mockLogin)
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
        });

        it("Agregar un producto al carrito: /carts/:cid/product/:pid debe agregar un producto", async () => {

            //Given
            const quantity = {
                quantity: 1
            }

            //Then
            const {statusCode, _body} = await requester.post(`/api/carts/${idCart}/product/${idProduct}`)
                .send(quantity)
                .set('cookie', `${cookie.name}=${cookie.value}`);

            
            //Assert
            expect(statusCode).is.eqls(200);
            expect(_body.products).to.be.an('array');
        });

        it("Traer el carrito: /carts/:cid muestra lo que hay en el carrito", async () => {

            //Given

            //Then
            const {statusCode, _body} = await requester.get(`/api/carts/${idCart}`);
            // console.log(_body);

            //Assert
            expect(statusCode).is.equal(200);
            expect(_body[0].product_id._id).is.equal(idProduct)
        });

    })

})