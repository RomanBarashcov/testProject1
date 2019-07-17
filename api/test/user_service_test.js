process.env.NODE_ENV = 'test';

const chai = require('chai');

var service = require("../services/user_service");

describe('User Service Testing', () => {
  
  describe('userService.getUsers()', (done) => {
    it('should get a object of users', (done) => {
         service.getUsers().then(result => {
            chai.expect(result).to.be.a('object');
            chai.expect(result.success).to.eq(true);
            done();
         });
    })
  });

  describe('userService.getUserById()', (done) => {
    it('should get a object of user by id', (done) => {
         service.getUserById(1).then(result => {
            chai.expect(result).to.be.a('object');
            chai.expect(result.success).to.eq(true);
            done();
         });
    })
  });

  describe('userService.updatePlayerTeam()', (done) => {

      const adminId = 1;
      const playerId = 3;
      const teamId = 1;

    it('should get a object after updated player team', (done) => {
         service.updatePlayerTeam(adminId, playerId, teamId).then(result => {
            chai.expect(result).to.be.a('object');
            chai.expect(result.success).to.eq(true);
            done();
        });
    })
  });

  describe('userService.updataUserRole()', (done) => {

        const userId = 3;
        const roleId = 3;

        it('should get a object after updated user role', (done) => {
            service.updataUserRole(userId, roleId).then(result => {
                chai.expect(result).to.be.a('object');
                chai.expect(result.success).to.eq(true);
                done();
            });
        })
    });

    describe('userService.liveTeam()', (done) => {

        const adminId = 1;
        const playerId = 3;
        const teamId = 1;
        const isleft = true;
        const reason = "because";

        it('should get a object after left from team', (done) => {
            service.liveTeam(adminId, playerId, teamId, isleft, reason).then(result => {
                chai.expect(result).to.be.a('object');
                chai.expect(result.success).to.eq(true);
                chai.expect(result.value.user).to.be.a('object');
                chai.expect(result.value.notification).to.be.a('object');
                done();
            });
        })
    });

    describe('userService.blockUser()', (done) => {

        const adminId = 1;
        const userId = 3;
        const isBlock = true;
        const reason = "because";

        it('should get a object after block user', (done) => {
            service.blockUser(adminId, userId, isBlock, reason).then(result => {
                chai.expect(result).to.be.a('object');
                chai.expect(result.success).to.eq(true);
                chai.expect(result.value.user).to.be.a('object');
                chai.expect(result.value.notification).to.be.a('object');
                done();
            });
        })
    });

});