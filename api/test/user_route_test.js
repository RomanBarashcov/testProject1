process.env.NODE_ENV = 'test';

const chai = require('chai');;
const chaiHttp = require('chai-http');

var app = require('../app');
const models = require('../models/index');
const seed = require('./seeders/user_seed');

chai.use(chaiHttp);

describe('API Routes', () => {

  // start with a fresh DB 
  /* beforeEach(done => {
    models.sequelize.sync({ force: true, match: /_test$/, logging: false })
    .then(() => {
      return seed(models)
    }).then(() => {
      done();
    })

  }) */
  
  describe('GET /api/users', (done) => {
    it('should get a object of users and status', (done) => {
      chai.request(app)
      .get('/api/users')
      .end((err, res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res).to.be.json;
        chai.expect(res.body).to.be.a('object');
        done();
      })
    })
  });

  describe('GET /api/:id', (done) => {
    it('should get a object of user', (done) => {
      chai.request(app)
      .get('/api/1')
      .end((err, res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res).to.be.json;
        chai.expect(res.body).to.be.a('object');
        done();
      })
    })
  });
  
})