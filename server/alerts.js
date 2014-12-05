Alerts.allow({
  insert: function(userId, doc) {
    return true; //(userId && doc.from === userId) || (userId === 'Strngs Support')
  }
  , update: function(userId, doc, fieldNames, modifier) {
    return false;
  }
  , remove: function(userId, doc) {
    return doc.to === userId;
  }
  , fetch: ['to', 'from']
});

Alerts.deny({
  remove: function (userId, doc) {
    // can't remove locked documents
    return !doc.canDelete;
  },
  fetch: ['canDelete']
});

Meteor.publish("alerts", function() {
  return Alerts.getAlerts(this.userId);
});

Meteor.startup(function() {
  Accounts.validateNewUser(function (user) {
    if(typeof user !== 'undefined') {
      // Send first alert
      Alerts.sendAlert({
        canDelete: true
        , from: MailboxConfig.supportUser._id
        , fromName: MailboxConfig.supportUser.name
        , link: '{{ pathFor "mailbox" }}/#alerts'
        , message: 'You will be able to quickly access system alerts from here'
        , subject: 'System Alerts'
        , to: user._id
        , unopened: true
      });
    }

    return true;
  });
});