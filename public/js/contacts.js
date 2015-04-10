// Contacts
App.ContactsRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('contact');
  }
});
App.ContactsController = Ember.ArrayController.extend({
  sortProperties: ['name']
});

App.ContactsIndexController = Ember.Controller.extend({
  open: function() {
    debugger
    return "Open Now";
  }.property()
});

