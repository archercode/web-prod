var App = Ember.Application.createWithMixins({
  LOG_TRANSITIONS: true,
  ready: function() {
    App.GetRecipeItems();   // this triggers an AJAX call to Clojure REST interface
  }
});

App.ApplicationRoute = Ember.Route.extend({
  actions: {
    showModal: function(name, model) {
        console.log("app route showModal!!");
        console.log(name);
        console.log(model);
        
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
    }
  }
});

App.Router.map(function() {

  /* TONNY 04.04.15 */
  this.route('checkout');


  this.route('credits');
  this.resource('contacts', function() {
    this.resource('contact', { path: '/:contact_id' });
  });

  this.resource('products', function() {
    this.route('seasonal');
    this.route('sale');
    this.route('sensor');
    this.route('microcontroller');
    this.resource('product', { path: '/:product_id' });
  });
});

if (window.history && window.history.pushState) {
  App.Router.reopen({
    location: 'hash',
    rootURL: '/demo/index.html'
  });
}


// Index
App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('product');
  }
});
App.IndexController = Ember.ArrayController.extend({
  onSale: function() {
    //return this.filterProperty('isOnSale', true).slice(0,3);
    return this.filterBy('isOnSale').slice(0,3);
  }.property('@each.isOnSale'),

  // productCount: function() {
  //   return this.get('length');
  // }.property('length')

  productCount: Ember.computed.alias('length')
});



/*
 * ModalDialogComponent
 */

App.ModalDialogComponent = Ember.Component.extend({
  actions: {
    ok: function() {
      this.$('.modal').modal('hide');
      this.sendAction('ok');
    }
  },
  show: function() {
    jQuery.noConflict();
    this.$('.modal').modal().on('hidden.bs.modal', function() {
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



App.ProductDetailModalController = Ember.ObjectController.extend({
    getTitle: function(){
        return this.get('model').get('title')
    }.property(),
   
    actions: {
      getTitle: function(){
          return this.get("title");
      },
      // YesButton
      logout: function(args) {
      //alert('prodDetail');
      var title = this.get('model').title;//.get('title');
      var price = this.get('model').price;//.get('price');
      console.log(title, price);

      var newProduct = this.store.createRecord('cart',
      {   
        name: title,
        amount: price
      }),
        controller = this;
        newProduct.save();
        console.log("product " + name + title + "was added to cart");
    }
  }, 
    
});

// Handlebars
Ember.Handlebars.registerBoundHelper('money', function(value) {
  return accounting.formatMoney(value/100);
});



