/**
 * mailbox common functionality
 * @type {Object}
 */
var mailbox = {
  hashHandler: function(val) {
    var passed = typeof val !== 'undefined' ? val : false
    , hashed = location.hash !== '' ? location.hash : '#inbox'
    , hsh = passed !== false ? passed : hashed
    , el = $('.nav-tabs a[href="' + hsh + '"]');

    if (typeof el !== 'undefined') {
      el.tab('show');
    }
  }
};


/**
 * Mailbox template events
 */
Template.mailbox.events({
  'click .nav-tabs a': function(e) {
    e.preventDefault();

    var el = $(e.target);
    Router.go(window.location.pathname + el.attr('href'));
    el.tab('show');
  }
  , 'mailbox-hashchange #mailbox-tabs': function(e, Blaze, val) {
    mailbox.hashHandler(val);
  }
});

/**
 * Inbox partial Helper
 */
Template.inbox.helpers({
  mail: function() {
   return Session.get('messages');
  }
});

/**
 * Inbox partial events
 */
Template.inbox.events({
  'click .openMessage': function(e) {
    e.preventDefault();
    var self = $(e.target).closest('tr')
    , showMsg = self.next('.showMessage')
    , unopened = self.data('unopened')
    , id = self.data('id');

    if(unopened) {
      Messages.updateMsgValue(id, { 'unopened': false });
    }
    showMsg.slideDown();
  }
  , 'click .msgClose': function(e) {
    e.preventDefault();
    $(e.target).closest('.showMessage').slideUp();
  }

  , 'click .msgDelete': function(e) {
    e.preventDefault();
    var self = $(e.target)
    , id = self.data('id');

    Messages.deleteMsg(id);
  }
});

/**
 * Inbox partial init
 */
Template.inbox.rendered = function() {
  mailbox.hashHandler();
};

/**
 * Outbox partial Helper
 */
Template.outbox.helpers({
  mail: function() {
   return Session.get('messages-sent');
  }
});

/**
 * Outbox partial init
 */
Template.outbox.rendered = function() {
  mailbox.hashHandler();
};

/**
 * Alertbox partial Helper
 */
Template.alertbox.helpers({
  alerts: function() {
   return Session.get('alerts');
  }
});

/**
 * Alertbox partial init
 */
Template.alertbox.rendered = function() {
  mailbox.hashHandler();
};

Template.draftBody.helpers({
  messageTo: function() {
    return {
      position: "bottom",
      limit: 5,
      rules: [
        {
          token: '@',
          collection: Meteor.users,
          field: "profile.name",
          template: Template.userPill
        }
      ]
    }
  }
});