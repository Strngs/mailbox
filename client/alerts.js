Meteor.startup(function() {
  Meteor.subscribe("alerts");

  Tracker.autorun(Alerts.updateAlerts);
});