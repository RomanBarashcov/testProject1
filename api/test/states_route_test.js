process.env.NODE_ENV = 'test';

const chai = require('chai');;
const chaiHttp = require('chai-http');

var app = require('../app');

chai.use(chaiHttp);

describe('API Routes', () => {
  
  describe('GET /api/states', (done) => {
    it('should get a object of states and status', (done) => {
      chai.request(app)
      .get('/api/states')
      .end((err, res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res).to.be.json;
        chai.expect(res.body).to.be.a('object');
        done();
      })
    })
  });
  
})