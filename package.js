/**
 * Mailbox - Internal user mail for your meteor project
 */

Package.describe({
  name: "strngs:mailbox",
  summary: "Internal user mail for your meteor project",
  version: "0.0.0",
  git: "https://github.com/Strngs/mailbox"
});

Package.on_use(function(api){
  api.imply(['strngs:comet'])

  both = ['client','server']

  api.versionsFrom('1.0');

  api.use([
    'strngs:comet',
    'iron:router@1.0.0',
    'accounts-base',
    'accounts-password',
    'underscore',
    'aldeed:collection2@2.2.0',
    'aldeed:autoform@4.0.0',
    'alanning:roles@1.2.13',
    'mrt:moment@2.8.1'
  ], both);

  api.use(['less','session','jquery','templating'],'client')

  api.use(['email'],'server')

  api.add_files([
    'lib/both/routes.js',
    'lib/both/alerts.js',
    'lib/both/messages.js',
  ], both);

  api.add_files([
    'client/messages.js',
    'client/alerts.js',
    'client/views/header/header.html',
    'client/views/mailbox/mailbox.html',
    'client/views/mailbox/mailbox.js',
    'client/helpers.js',
    'client/views/mailbox/mailbox.less'
  ], 'client');

  api.add_files([
    'server/alerts.js',
    'server/messages.js'
  ], 'server');

  api.export('Messages',both);
  api.export('Alerts',both);
});
