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
  both = ['client','server']

  api.versionsFrom('1.0');

  api.use([
    'iron:router@1.0.0',
    'accounts-base',
    'accounts-password',
    'underscore',
    'aldeed:collection2@2.2.0',
    'aldeed:autoform@4.0.0',
    'alanning:roles@1.2.13',
    'raix:handlebar-helpers@0.1.3',
    'mrt:moment@2.8.1'
  ], both);

  api.use(['less','session','jquery','templating'],'client')

  api.use(['email'],'server')

  // api.add_files([
  // ], both);

  // api.add_files([
  // ], 'client');

  // api.add_files([
  // ], 'server');

  // api.export('Messages',both)
});
