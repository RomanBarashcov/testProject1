process.env.NODE_ENV = 'test';

const chai = require('chai');

var service = require("../services/role_service");

describe('Role Service Testing', () => {
  
  describe('roleService.getRoles()', (done) => {
    it('should get a object of Roles', (done) => {
         service.getRoles().then(result => {
            chai.expect(result).to.be.a('object');
            chai.expect(result.success).to.eq(true);
            done();
         });
    });
  });
});