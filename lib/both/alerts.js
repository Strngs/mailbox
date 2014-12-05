/*global Alerts:true */
Alerts = new Mongo.Collection('alerts');

// Alerts core functionality
_.extend(Alerts, {
  sendAlert: function(msgObj) {
    var msgTmpl = {
      canDelete: true
      , from: null
      , fromName: null
      , link: false
      , message: null
      , subject: null
      , timeStamp: moment().format('YYYY-MM-DD')
      , to: null
      , type: 'System'
      , unopened: true
    };

    if(msgObj.to === null || msgObj.from === null) {
      throw new Meteor.Error(403, "You are not allowed to send this message!");
    }

    _.extend(msgTmpl, msgObj);
    Alerts.insert(msgTmpl);
  }
  , getAlerts: function(usrId) {
    return Alerts.find({to: usrId});
  }
  , deleteAlert: function(msgId) {

  }
  , updateAlerts: function() {
    var usrId = Meteor.userId()
    , allAlerts = Alerts.find({to: usrId}).fetch()
    , fromAlerts = Alerts.find({from: usrId}).fetch()
    , usrUnreadAlertsCount = _.where(allAlerts, {unopened: true}).length
    , usrUnreadAlerts = usrUnreadAlertsCount > 0 ? true : false;

    Session.set('alerts', allAlerts);
    Session.set('alertsCount', usrUnreadAlertsCount);
    Session.set('showAlerts', usrUnreadAlerts);
  }
});