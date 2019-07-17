process.env.NODE_ENV = 'test';

const chai = require('chai');;
const chaiHttp = require('chai-http');

var app = require('../app');
const models = require('../models/index');
const seed = require('./seeders/user_seed');

chai.use(chaiHttp);

const userCredentials = {
  email: 'superadmin@mail.com', 
  password: '123456'
}

describe('API Users Routes', () => {

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

 /* describe('GET /api/users/:id', (done) => {
    it('should get a 403 status when user is not auth', (done) => {
      chai.request(app)
      .get('/api/users/1')
      .end((err, res) => {
        chai.expect(res.status).to.equal(403);
        done();
      })
    })
  });

  describe('GET /api/users/current-user', (done) => {
    it('should get a 403 status when user is not auth', (done) => {
      chai.request(app)
      .get('/api/users/current-user')
      .end((err, res) => {
        chai.expect(res.status).to.equal(403);
        done();
      })
    })
  });
 */

  describe('GET /api/:id', (done) => {
    it('should auth and return user by id', (done) => {
      chai.request(app)
      .post('/api/authentication')
      .send(userCredentials)
      .end((err, res) => {
          chai.expect(res).to.have.cookie('project-access');
          chai.expect(res.status).to.equal(200);
          chai.expect(res).to.be.json;
          chai.expect(res.body).to.be.a('object');
    
          it('should return user object by id', (done) => {
          return chai.request(app)
            .get('/api/users/1')
            .end((err, res) => {
              chai.expect(res.status).to.equal(200);
              chai.expect(res).to.be.json;
              chai.expect(res.body).to.be.a('object');
              done();
            })
          });

          done();
        })
    })
  });

  describe('GET /api/current-user', (done) => {
    it('should auth and return current user', (done) => {
      chai.request(app)
      .post('/api/authentication')
      .send(userCredentials)
      .end((err, res) => {
          chai.expect(res).to.have.cookie('project-access');
          chai.expect(res.status).to.equal(200);
          chai.expect(res).to.be.json;
          chai.expect(res.body).to.be.a('object');

          it('should return current user after auth', (done) => {
           return chai.request(app)
            .get('/api/users/current-user')
            .end((err, res) => {
              chai.expect(res.status).to.equal(200);
              chai.expect(res).to.be.json;
              chai.expect(res.body).to.be.a('object');
              done();
            })
          });
        });
          done();
    });
  });
});