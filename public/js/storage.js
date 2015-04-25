

Ember.onLoad('Ember.Application', function(Application) {
  Application.initializer({
    name: "registerStorage",
    initialize: function(container, application) {
      console.log('-> registerStorage');
      application.register('storage:main', application.Storage, {singleton: true});
      var s = container.lookup('storage:main');
    }
  });
  Application.initializer({
    name: "injectStorage",
    initialize: function(container, application) {
      console.log('-> injectStorage');
      application.inject('controller', 'storage', 'storage:main');
      application.inject('route', 'storage', 'storage:main');
    }
  });
});

App.Storage = Ember.Object.extend({
  init: function() {
   // this.clearStorage();
    if (window.localStorage.length == 0){
        var items = 
        [
          {
            id: 'demo',
            amount: 0,
            quantity: 0
          }
        ];
        localStorage.items = JSON.stringify(items);
    }
    else{


    }


    //localStorage.clear();
  },
  find: function(key) {
    // pseudo implementation
    if( !Ember.isNone(key) ) {
      var items = [];
      var storedItems = JSON.parse(localStorage[key]).cart.records;

      /*storedItems.forEach(function(item){
        items.pushObject(item);
      });
      */

for (var key in p) {
  if (p.hasOwnProperty(key)) {
    alert(key + " -> " + p[key]);
  }
}


      return items;
    }
  },
  clearStorage: function() {
    // pseudo implementation
    localStorage.clear();
  }
});

