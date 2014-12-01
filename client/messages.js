Meteor.startup(function() {
  Meteor.subscribe("messages");
  Meteor.subscribe("messages-sent");

  Tracker.autorun(Messages.updateMsgs);
});