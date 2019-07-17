process.env.NODE_ENV = 'test';

const chai = require('chai');;
const chaiHttp = require('chai-http');

var app = require('../app');

chai.use(chaiHttp);

describe('API Routes', () => {
  
  describe('GET /api/teams', (done) => {
    it('should get a object of teams and status', (done) => {
      chai.request(app)
      .get('/api/teams')
      .end((err, res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res).to.be.json;
        chai.expect(res.body).to.be.a('object');
        done();
      })
    })
  });

  describe('GET /api/teams/id', (done) => {
    it('should get a object of team and status', (done) => {
      chai.request(app)
      .get('/api/teams/1')
      .end((err, res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res).to.be.json;
        chai.expect(res.body).to.be.a('object');
        done();
      })
    })
  });

  describe('GET /api/teams/id', (done) => {
    it('should get a empty object, when incorrect id', (done) => {
      chai.request(app)
      .get('/api/teams/5')
      .end((err, res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res).to.be.json;
        chai.expect(res.body).to.be.a('object');
        done();
      })
    })
  });
  
})