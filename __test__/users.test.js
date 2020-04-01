const supertest = require('supertest');
var app = require('../app');
var mongoose = require('mongoose');

beforeAll(() => {
    mongoose.Promise = Promise;
    mongoose.connect('mongodb://localhost:27017/madb', {useNewUrlParser: true, useUnifiedTopology: true});
});

afterAll(() => {
    mongoose.disconnect();
})

describe("Testing API Node JS", () => {

    it("Test users route : findAll", async () => {
        const response = await supertest(app).get('/v1/users');
        expect(response.status).toBe(200);
    });

    
    it("test users route : findOne", async () => {
        const response = await supertest(app).get('/v1/users/1');
        expect(response.status).toBe(200);
    });
    

    it("Test Users routes : create ", async() => {
        const response = await supertest(app)
        .post('/v1/users')
        .send({ id: 4, name: "Nyatsu", lastname: "Homiu", email: "nya.homiu@test.fr", password: "12345"});
        expect(response.status).toBe(201);
    });

    it("test Users routes: update", async() => {
        const response = await supertest(app)
        .put('/v1/users/3')
        .send({ id: 3, name: "Test-1", lastname: "Homiu-test", email: "nya.homiu@test.test.fr", password: "123456"});
        expect(response.status).toBe(200);
    })

    it("Test Users routes : delete", async() => {
        const response = await supertest(app)
        .delete('/v1/users/4');
        expect(response.body);
        expect(response.status).toBe(200);
    })
});