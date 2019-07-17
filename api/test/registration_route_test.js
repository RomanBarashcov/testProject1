process.env.NODE_ENV = 'test';

const chai = require('chai');;
const chaiHttp = require('chai-http');
const db = require('../models/index');
const seed = require('./seeders/user_seed');
var app = require('../app');

chai.use(chaiHttp);

const newUserCredentials = {
    name: "super player", 
    email: 'player@mail.com', 
    password: '123456',
    confirmPassword: '123456',
    teamId: 1
}


 describe('API REG Routes', () => {
  
  /*   describe('POST /api/registration', (done) => {

        before(async (done) => {

            await db.User.destroy({force: true, truncate: true});
            done();
        });

        it('should create new user', (done) => {
            chai.request(app)
            .post('/api/registration')
            .send(newUserCredentials)
            .end((err, res) => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res).to.be.json;
                chai.expect(res.body).to.be.a('object');
                done();
            });
        });
    }); */
});
