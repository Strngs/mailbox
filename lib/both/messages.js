/*global Messages:true, Schema:true */
Messages = new Mongo.Collection('messages');
MessagesSettings = new Mongo.Collection('messages-settings');
Schema = {};

Schema.Messages = new SimpleSchema({
  canDelete: {
    type: Boolean
    , optional: true
    , allowedValues: [true, false]
  }
  , canReply: {
    type: Boolean
    , optional: true
    , allowedValues: [true, false]
  }
  , from: {
    type: String
    , optional: false
  }
  , fromName: {
    type: String
    , label: 'From'
    , optional: false
  }
  , message: {
    type: String
    , label: 'Message'
    , optional: false
  }
  , subject: {
    type: String
    , label: 'Subject'
    , optional: false
  }
  , timeStamp: {
    type: String
  }
  , to: {
    type: String
    , label: 'To'
    , optional: false
  }
  , unopened: {
    type: Boolean
    , optional: true
    , allowedValues: [true, false]
  }
});

Schema.MessagesSettings = new SimpleSchema({
  welcomeUserFrom: {
    type: Object
    , label: 'Select from whom welcome message will come'
    , optional: false
  }
});

// Messages core functionality
_.extend(Messages, {
  deleteMsg: function(id) {
    Messages.remove(id);
  }
  , getInbox: function(usrId) {
    return Messages.find({to: usrId});
  }
  , getOutbox: function(usrId) {
    return Messages.find({from: usrId});
  }
  , getAvailableUsers: function(reg) {
    // Meteor.Users.find({"username":})
  }
  , sendMessage: function(msgObj) {
    var msgTmpl = {
      canDelete: true
      , canReply: true
      , from: null
      , fromName: null
      , message: null
      , subject: null
      , timeStamp: moment().format('YYYY-MM-DD')
      , to: null
      , unopened: true
    };

    if(msgObj.to === null || msgObj.from === null) {
      throw new Meteor.Error(403, "You are not allowed to send this message!");
    }

    _.extend(msgTmpl, msgObj);
    Messages.insert(msgTmpl);
  }
  , updateMsgValue: function(id, value) {
    Messages.update(id, { $set: value });
  }
  , updateMsgs: function() {
    var usrId = Meteor.userId()
    , allMsgs = Messages.find({to: usrId}).fetch()
    , fromMsgs = Messages.find({from: usrId}).fetch()
    , usrUnreadMsgsCount = _.where(allMsgs, {unopened: true}).length
    , usrUnreadMsgs = usrUnreadMsgsCount > 0 ? true : false;

    Session.set('messages', allMsgs);
    Session.set('messages-sent', fromMsgs);
    Session.set('messageCount', usrUnreadMsgsCount);
    Session.set('showMessages', usrUnreadMsgs);
  }
});

Messages.attachSchema( Schema.Messages );
MessagesSettings.attachSchema( Schema.MessagesSettings );

CometDashboard.settings['Messages'] = MessagesSettings;