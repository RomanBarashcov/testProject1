

process.env.NODE_ENV = 'test';

const chai = require('chai');;
const chaiHttp = require('chai-http');
var app = require('../app');

const userCredentials = {
    email: 'superadmin@mail.com', 
    password: '123456'
}

const wrongPasswordCred = {
    email: 'superadmin@mail.com', 
    password: '1234562222'
}

const wrongPasswordCred2 = {
    email: 'superawwwwdmin@mail.com', 
    password: '1234562222'
}

chai.use(chaiHttp);

describe('API Routes AUTH', () => {

    describe('POST /api/authentication', (done) => {
        it('should get a object of current user and status', (done) => {
            chai.request(app)
            .post('/api/authentication')
            .send(userCredentials)
            .end((err, res) => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res).to.have.cookie('project-access');
                chai.expect(res).to.be.json;
                chai.expect(res.body).to.be.a('object');
                done();
                })
        })

    });

    describe('POST /api/authentication', (done) => {
        it('should get 403 status when wrong password', (done) => {
            chai.request(app)
            .post('/api/authentication')
            .send(wrongPasswordCred)
            .end((err, res) => {
                chai.expect(res.status).to.equal(403);
                chai.expect(res).to.be.json;
                chai.expect(res.body).to.be.a('object');
                done();
                })
        })

    });

    describe('POST /api/authentication', (done) => {
        it('should get 403 status when wrong password or email', (done) => {
            chai.request(app)
            .post('/api/authentication')
            .send(wrongPasswordCred2)
            .end((err, res) => {
                chai.expect(res.status).to.equal(403);
                chai.expect(res).to.be.json;
                chai.expect(res.body).to.be.a('object');
                done();
                })
        })

    });
});

