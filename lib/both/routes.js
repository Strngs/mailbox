Router.map(function() {
  this.route('mailbox', {
    path: '/profile/mailbox',
    name: 'mailbox',
    onBeforeAction: function () {
      AccountsEntry.signInRequired(this);
    }
  });
});
