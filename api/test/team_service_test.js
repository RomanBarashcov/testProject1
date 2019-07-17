process.env.NODE_ENV = 'test';

const chai = require('chai');

var service = require("../services/team_service");

describe('Team Service Testing', () => {
  
  describe('teamService.getTeams()', (done) => {
    it('should get a object of teams', (done) => {
         service.getTeams().then(result => {
            chai.expect(result).to.be.a('object');
            chai.expect(result.success).to.eq(true);
            done();
         });
    })
  });

  describe('teamService.getTeamById()', (done) => {
    it('should get a object with object of team by id', (done) => {
         service.getTeamById(1).then(result => {
            chai.expect(result).to.be.a('object');
            chai.expect(result.success).to.eq(true);
            done();
         });
    })
  });

  describe('teamService.getTeamById(with -1 in params)', (done) => {
    it('should get a object with massage incorrect teamid', (done) => {
         service.getTeamById(-1).then(result => {
            chai.expect(result).to.be.a('object');
            chai.expect(result.success).to.eq(false);
            chai.expect(result.message).to.eq("Incorrect teamId");
            done();
         });
    })
  });
});