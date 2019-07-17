process.env.NODE_ENV = 'test';

const chai = require('chai');

var service = require("../services/notification_service");

describe('Notification Service Testing', () => {
  
  describe('notificationService.getNotifications()', (done) => {
    it('should get a object of Notifications', (done) => {
         service.getNotifications().then(result => {
            chai.expect(result).to.be.a('object');
            chai.expect(result.success).to.eq(true);
            done();
         });
    });
  });
});