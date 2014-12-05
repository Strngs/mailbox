// We provide defaults in the event that config values have not been set.
// Ideally, we will do this in simplSchema when creating the config panel
MailboxConfigDefaults = {
  supportUser: {
    _id: 0,
    name: 'Admin'
  }
}

MailboxConfig = MailboxConfig || {};
MailboxConfig = _.extend(MailboxConfigDefaults, MailboxConfig);