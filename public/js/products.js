
App.ProductsRoute = Ember.Route.extend({
 model: function() {
    var url = '/recipes/';
    var store = this.store;
    return Ember.$.getJSON(url).then(function(data) {
        var arrData = [];
        for (var i = 0, len = data.length; i < len; i++) {
            store.createRecord('product', {    
                title:       data[i]['title'],
                price:       data[i]['price'],
                model:       data[i]['model'],
                description: data[i]['description'],
                type:        data[i]['type'],
                image:       data[i]['image'],
                //link:        data[i]['link']
            });
        }
        return data;
      });
  },
});


///////////////////////////////////////////////////////////
App.ProductsIndexView = Ember.View.extend({
  didInsertElement: function() {
    var view = this;
    $(window).bind("scroll", function() {
      view.didScroll();
    });
  },

  didScroll: function() {
    if(this.isScrolledToBottom()) {
      this.get('controller').send('loadMoreItems');
      
    }
  },

  isScrolledToBottom: function(){
  var distanceToTop = $(document).height() - $(window).height(),
        top         = $(document).scrollTop();

    return top === distanceToTop;
  },

  willDestroyElement: function() {
  $(window).unbind("scroll");
  }

});
///////////////////////////////////////////////////////////




App.ProductsIndexRoute = Ember.Route.extend({
  tempStorage: function(){
    return this.modelFor('products');
  },
  showItems: 3,
  mod: [],
  prodController: null,
  appController:null,
  queryField: null, 
  beforeModel: function(transition){
    //console.log(transition);
    //console.log('beforeModel');
    prodController = this.controllerFor('products');
    //var query = prodController.get('query');
    //this.set('queryField',query);
    prodController.set('previousTransition', 'today');

    ///////////////
    appController = this.controllerFor('application');
    var q = appController.get('queryField');
    //console.log(q);
    this.set('queryField', q);


  },
  model: function(params) {
    if (!this.get('queryField')) {
      //return this.modelFor('products').splice(0,6);
      //return this.tempStorage();
      
      
      for(var i = 0; i < 3; ++i){
        this.mod[i] = this.tempStorage()[i];
      }
      this.incrementProperty('this.showItems', 3);
      return this.mod;
      
      //this.incrementProperty('this.showItems', 3);
      //return this.modelFor('products').slice(0,3);

    }
    var regex = new RegExp(this.get('queryField'), 'i');
    return this.modelFor('products').filter(function(product) {
      return regex.exec(product.title);
    });
    //return this.modelFor('products').filterProperty('title', params.query);
  },
  actions: {
    queryParamsDidChange: function() {
      this.refresh();
    },
    willTransition: function(){
      prodController.set('previousTransition', 'tomorrow');
    },
    ref:function(){
      this.refresh();
    },
    demo:function(){
      console.log('demo');
    },
    loadItems: function(){
      //this.incrementProperty('showItems');
      
      if (!this.queryField){
        var items = this.modelFor('products_index');
        var prod  = this.modelFor('products');
        var last  = prod.length;
        //this.incrementProperty('showItems');
        //this.incrementProperty('showItems');
        //if (this.showItems < prod.length){
          for(var i = this.showItems - 3 ; i < this.showItems; i++){
            if (last > i){
              items.addObject(prod[i]);
            }
          }
          this.incrementProperty('showItems', 3);
      }

      //}
      //this.modelFor('products_index').splice(0, this.showItems);
      //this.refresh();
    },
  },
});

// App.ProductsSeasonalRoute = Ember.Route.extend({
App.ProductsBoardsRoute = Ember.Route.extend({
  model: function () {
    return this.modelFor('products').filterProperty('type', 'boards');//.splice(0,this.spliceCount);
  }
});

//App.ProductsSaleRoute = Ember.Route.extend({
App.ProductsSensorsRoute = Ember.Route.extend({
  model: function () {
    return this.modelFor('products').filterProperty('type','sensors');
  }
});

//App.ProductsSensorRoute = Ember.Route.extend({
App.ProductsRoboticsRoute = Ember.Route.extend({
  model: function () {
    return this.modelFor('products').filterProperty('type','robotics');
    //return controllerFor.filterProperty('type', 'robotics');
  }
});


App.ProductsController = Ember.ArrayController.extend({
  needs: ['products_index'],
  previousTransition: 'now',
  sortProperties: ['title'],
  count: function() {
   // console.log(this);
    return this.get('length');
  }.property('length'),
    
    /*
  onSale: function() {
    return this.filterBy('isOnSale').get('length');
  }.property('@each.isOnSale'),

  seasonal: function () {
    return this.filterBy('isSeasonal').get('length');
  }.property('@each.isSeasonal'),
    
  sensor: function () {
    return this.filterBy('type','sensor').get('length');
  }.property('@each.type'),
  */
  actions: {
    closeModal: function(){
      //console.log('closeModal');
    },
    addItem: function(item){
      //console.log(item);
        var bool = false;
        var tempData = [];
        if(window.localStorage['ctr-store'] != null){
          var localData = JSON.parse(localStorage['ctr-store']);
          var storedItems = localData.cart.records;

          for (var key in storedItems) {
              if (storedItems.hasOwnProperty(key)) {
                  //if(storedItems[key].name == this.get('model').title){
                  if(storedItems[key].name == item.title){
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
                  //name: this.get('model').title,
                  //amount:this.get('model').price,
                  name: item.title,
                  amount:item.price,
                  quantity:1
            }
          );
            cartItem.save();
        }
    },

  },
  
});


App.ProductsIndexController = Ember.ArrayController.extend({
  needs: 'application',
  sortProperties: ['title'],
  modelRefresher: function(){
    //this.send('ref');
    //console.log('modelRefresher');
    //this.get('model').refresh();
    this.get('target.router').refresh();
    //this.get('route.products').send('ref');
  },
  loadMoreItems: function(){
      //this.incrementProperty('showItems');    
      //console.log('items increment'); 
      this.send('loadItems');
  },
  actions: {
    addItem: function(item){
      var  prodController = this.controllerFor('products');
      prodController.send('addItem', item);
    },
  },
});

App.ProductsBoardsController = Ember.ArrayController.extend({
  actions: {
    addItem: function(item){
      var  prodController = this.controllerFor('products');
      prodController.send('addItem', item);
    },
  },
});
App.ProductsSensorsController = Ember.ArrayController.extend({
  actions: {
    addItem: function(item){
      var  prodController = this.controllerFor('products');
      prodController.send('addItem', item);
    },
  },
});
App.ProductsRoboticsController = Ember.ArrayController.extend({
  actions: {
    addItem: function(item){
      var  prodController = this.controllerFor('products');
      prodController.send('addItem', item);
    },
  },
});

/*
var showdown = new Showdown.converter();

Ember.Handlebars.helper('format-markdown', function(input){
  return new Handlebars.SafeString(showdown.makeHtml(input));
});
*/

/*

App.SomeAuthenticatedRoute = Ember.Route.extend({
  beforeModel: function(transition) {
    if (!this.controllerFor('auth').get('userIsLoggedIn')) {
      var loginController = this.controllerFor('login');
      loginController.set('previousTransition', transition);
      this.transitionTo('login');
    }
  }
});

App.LoginController = Ember.Controller.extend({
  actions: {
    login: function() {
      // Log the user in, then reattempt previous transition if it exists.
      var previousTransition = this.get('previousTransition');
      if (previousTransition) {
        this.set('previousTransition', null);
        previousTransition.retry();
      } else {
        // Default back to homepage
        this.transitionToRoute('index');
      }
    }
  }
});


App.ProductReviewsNewController = Ember.ObjectController.extend({
  reviewText: '',
  actions: {
    createReview: function() {
      var product = this.get('model'),
          review = this.store.createRecord('review', {
            review: this.get('reviewText')})
      product.get('reviews').addObject(review);
    }
  }
});

// Components
// App.ProductDetailComponent = Ember.Component.extend({
//   classNameBindings: ['isOnSale:adsfasdfa']
// });

    /*
*/

App.ProductDetailComponent = Ember.Component.extend({
  classNameBindings: ['isOnSale'],
  isOnSale: function() {
    return this.get('product.isOnSale');
  }.property(),
    
  actions: {
    addMe: function(item){
      this.sendAction('addMe', item);
      //this.get('storage').addToCart(this.store, product.title, product.price);
    },
    openModal: function(action, model) {
      this.get('parentView').send('showModal', action, model);
    },
    closeModal: function() { 
      this.get('parentView').send('removeModal', action);
      //this.sendAction('closeModal');
    },   
  }
});
