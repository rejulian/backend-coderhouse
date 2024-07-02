import {expect} from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
const port = 8081;

const requester = supertest(`http://localhost:${port}`);

mongoose.connect(process.env.MONGO_URI);

describe("testing ecommerce app", () => {

    describe("Testing user api", () => {

        
        let cookie;
        const userMock = {
            first_name: "Lionel",
            last_name: "Messi",
            email: "liomessicoder@gmail.com",
            age: 37,
            password: "123456"
        };
        
        it("Crear nuevo usuario: /api/session/register debe crear un nuevo usuario", async () => {

            //Given
            

            //Then
            const {statusCode, _body} = await requester.post("/api/session/register").send(userMock);
            // console.log(result);

            //Assert
            expect(statusCode).is.eqls(200);
            expect(_body).is.ok.and.to.have.property('_id');
        })

        it("Loguear un usuario: /api/login debe devolver informacion del usuario logueado", async () => {

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

        it("Test ruta current: Debo enviar los datos de usuario logueado", async () => {

            //Given

            //Then
            const {_body} = await requester.get("/api/session/current").set('cookie', [`${cookie.name}=${cookie.value}`])
            // console.log(_body);

            //Assert
            expect(_body.email).to.be.ok.and.eql(userMock.email);

        })

    })

})