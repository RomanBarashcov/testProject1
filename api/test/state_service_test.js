process.env.NODE_ENV = 'test';

const chai = require('chai');

var service = require("../services/state_service");

describe('State Service Testing', () => {
  
  describe('stateService.getStates()', (done) => {
    it('should get a object of states', (done) => {
         service.getStates().then(result => {
            chai.expect(result).to.be.a('object');
            chai.expect(result.success).to.eq(true);
            done();
         });
    });
  });
});