var isAdmin = function(userId) {
  return Roles.userIsInRole(userId, 'admin');
}

Messages.allow({
  insert: function(userId, doc) {
    return doc.from === userId || doc.to === userId || isAdmin(userId);
  }
  , update: function(userId, doc, fieldNames, modifier) {
    if(doc.unopened) {
      return doc.from === userId || doc.to === userId || isAdmin(userId);
    } else {
      return doc.to === userId || isAdmin(userId);
    }
  }
  , remove: function(userId, doc) {
    if(doc.unopened) {
      return doc.from === userId || doc.to === userId || isAdmin(userId);
    } else {
      return doc.to === userId || isAdmin(userId);
    }
  }
  , fetch: ['to', 'from']
});

Messages.deny({
  remove: function (userId, doc) {
    // can't remove locked documents
    return !doc.canDelete && !isAdmin(userId);
  },
  fetch: ['canDelete']
});

Meteor.publish("messages", function() {
  return Messages.getInbox(this.userId);
});

Meteor.publish("messages-sent", function() {
  return Messages.getOutbox(this.userId);
});

Meteor.startup(function() {
  Accounts.validateNewUser(function (user) {
    if(typeof user !== 'undefined') {
      // Send welcome message
      Messages.sendMessage({
        canDelete: true
        , canReply: false
        , from: MailboxConfig.supportUser._id
        , fromName: MailboxConfig.supportUser.name
        , message: 'We are excited to have you! :)<br />Please be sure to read the getting started guides for <a href="/docs/user">users</a> and <a href="/docs/devs">devs</a>.'
        , subject: 'Welcome to Strngs!'
        , to: user._id
        , unopened: true
      });
    }

    return true;
  });
});