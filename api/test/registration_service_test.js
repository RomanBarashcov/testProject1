process.env.NODE_ENV = 'test';

const chai = require('chai');

var service = require("../services/registration_service");

describe('Registrate Service Testing', () => {
  
  describe('registrateService.registrate()', (done) => {

    let name = "admin", email = "superadmin@mail.com", password = "123456", temaId = 1;

    it('should get a object with error message(User with the same email was registered)', (done) => {
         service.registrate(name, email, password, temaId).then(result => {
            chai.expect(result).to.be.a('object');
            chai.expect(result.success).to.eq(false);
            chai.expect(result.message).to.eq("User with the same email was registered!");
            done();
         });
    });
  });

});