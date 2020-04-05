const supertest = require('supertest');
var app = require('../app');
const URI = "mongodb+srv://dbUser:charles01160@cluster0-16lsq.gcp.mongodb.net/test?retryWrites=true&w=majority";
var mongoose = require('mongoose');


beforeAll(() => {
    const connectDB = async() => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log('db connected..!');
};
});

afterAll(() => {
    mongoose.disconnect();
})


describe("Testing API Node JS", () => {

    it("tests our testing framework if it works", () => {
        expect(2).toBe(2);
    });

    /*
    it("Test Users routes : create ", async() => {
        const response = await supertest(app)
        .post('/v1/users')
        .send({ id: 4, name: "Toti", lastname: "Nation", email: "toti.nation@test.fr", password: "12345"});
        expect(response.status).toBe(201);
    });
    */
   
    it("Test users route : findAll", async () => {
        const response = await supertest(app).get('/v1/users');
        expect(response.status).toBe(200);
    });

    
    it("test users route : findOne", async () => {
        const response = await supertest(app).get('/v1/users/1');
        expect(response.status).toBe(200);
    });
    

    it("test Users routes: update", async() => {
        const response = await supertest(app)
        .put('/v1/users/1')
        .send({ id: 1, name: "Test-1", lastname: "Homiu-test", email: "nya.homiu@test.test.fr", password: "123456"});
        expect(response.status).toBe(200);
    })

    it("Test Users routes : delete", async() => {
        const response = await supertest(app)
        .delete('/v1/users/4');
        expect(response.body);
        expect(response.status).toBe(200);
    })
    
});