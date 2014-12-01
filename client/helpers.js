Template.registerHelper('fromNow', function(date){
  return moment(date).fromNow();
});

Template.messagesLoop.helpers({
  messages: function() {
   return Session.get('messages');
  }
  , showMessages: function() {
    return Session.get('showMessages');
  }
  , messageCount: function() {
    return Session.get('messageCount');
  }
});

Template.messagesLoop.events({
  'click .symlink': function() {
    if(Router.current().route.name === 'mailbox') {
      $('#mailbox-tabs').trigger('mailbox-hashchange', ['#inbox']);
    }
  }
});

Template.alertLoop.helpers({
  alerts: function() {
   return Session.get('alerts');
  }
  , showAlerts: function() {
    return Session.get('showAlerts');
  }
  , alertCount: function() {
    return Session.get('alertCount');
  }
});

Template.alertLoop.events({
  'click .symlink': function() {
    if(Router.current().route.name === 'mailbox') {
      $('#mailbox-tabs').trigger('mailbox-hashchange', ['#alerts']);
    }
  }
});