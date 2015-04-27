window.App = Ember.Application.createWithMixins({
  LOG_TRANSITIONS: true,
});

App.ApplicationRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('cart');
  },
  actions: {
    showModal: function(name, model) {
        var modalController = this.controllerFor(name);
        modalController.set('model', model);
        this.render(name, {
        into: 'application',
        outlet: 'modal',
        model: model,
        controller: modalController 
      });
    },
    removeModal: function() {
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    },
    logout: function(){
      Ember.$.getJSON("/email").then(function(data) {
        var arrData = [];
        for (var i = 0, len = data.length; i < len; i++) {
            store.createRecord('product', {    
                title:       data[i]['title'],
                price:       data[i]['price'],
                description: data[i]['description'],
                type:        data[i]['type'],
                image:       data[i]['image']
            });
        }
        return data;
      });
    }
  }
});



App.ApplicationController = Ember.ObjectController.extend({
  model: function () {
    return this.modelFor('cart');
  },
  actions: {
    deleteItem:function(key){
        var cart = this.store.all('cart');
        var store = this.store;
        var todo = this.get('model');
        todo.deleteRecord();
        todo.save();
    }
  },
});


App.Router.map(function() {
  this.route('credits');

  this.resource('products',
   { path: '/' }, function() {

    this.route('boards');
    this.route('sensors');
    this.route('robotics');
    
    //this.route('seasonal');
    //this.route('sale');
      this.resource('product', { 
        path: '/:product_id' 
      });
  });
});

if (window.history && window.history.pushState) {
  App.Router.reopen({
    location: 'hash',
    rootURL: '/demo/index.html',
      doSomethingOnUrlChange: function() {
          
          if($(document).ready())
        if(this.get('url') == "/boards" || this.get('url') == "/sensors" || this.get('url') == "/robotics" ){
            $('#content').goTo();
        }
      }.on('didTransition')  
  });
}


/*
App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('product');
  }
});

App.IndexController = Ember.ArrayController.extend({
  onSale: function() {
    return this.filterBy('isOnSale').slice(0,3);
  }.property('@each.isOnSale'),
  productCount: Ember.computed.alias('length')
});

*/

/*
 * ModalDialogComponent
 */

App.ModalDialogComponent = Ember.Component.extend({
  actions: {
    ok: function() {
      $('.modal').modal('hide');
      this.sendAction('ok');
    }
  },
    show: function() { 
      $('.modal').modal().on('hidden.bs.modal', function() {
        this.sendAction('close');
      }.bind(this));
    }.on('didInsertElement')
});



/*
 * LogoutModalController
 */
App.LogoutModalController = Ember.ObjectController.extend({
  actions: {
    logout: function() {
      alert('logout');
    }
  }
});


App.CheckoutModalController = Ember.ObjectController.extend({
  actions: {
    logout: function() {
      alert('logout');
    },
  }
});


App.ProductDetailModalController = Ember.ObjectController.extend({
    getTitle: function(){
        return this.get('model').get('title')
    }.property(),
    actions: {
    getTitle: function(){
        return this.get("title");
    },
    buyProduct: function(args) {

        var bool = false;
        var tempData = [];
        if(window.localStorage['ctr-store'] != null){
          var localData = JSON.parse(localStorage['ctr-store']);
          var storedItems = localData.cart.records;

          for (var key in storedItems) {
              if (storedItems.hasOwnProperty(key)) {
                if(storedItems[key].name == this.get('model').title){

                  localData.cart.records[key].quantity++;
                  var existing = this.store.update('cart',localData.cart.records[key]);
                  bool = true;
                  localStorage['ctr-store'] = JSON.stringify(localData);
                  break; 
                }
              }
          }
        }
        
        if (!bool){
            var cartItem = this.store.createRecord('cart', {    
                  name: this.get('model').title,
                  amount:this.get('model').price,
                  quantity:1
            }
          );
            cartItem.save();
        }
      },
    }, 
    find: function(key) {
      if( !Ember.isNone(key) ) {
        var items = [];
        var storedItems = JSON.parse(localStorage[key]);
        storedItems.forEach(function(item){
          items.pushObject(item);
        });
        return items;
      }
    }
});

// Handlebars
Ember.Handlebars.registerBoundHelper('money', function(value) {
  return accounting.formatMoney(value/100);
});



