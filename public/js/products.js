
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
///////////////////////////////////////////////////////////


App.ProductsIndexRoute = Ember.Route.extend({
  //model: function () { return this.modelFor('products');},
  
  prodController: null,
  queryField: null, 
  beforeModel: function(transition){
    //console.log(transition);
    //console.log('beforeModel');

    prodController = this.controllerFor('products');
    var query = prodController.get('query');
    this.set('queryField',query);
    prodController.set('previousTransition', "today");
  },
  model: function(params) {
    if (!this.get('queryField')) {
      return this.modelFor('products');
    }
    var regex = new RegExp(this.get('queryField'), "i");
    return this.modelFor('products').filter(function(product) {
      return regex.exec(product.title);
    });
    //return this.modelFor('products').filterProperty('title', params.query);
  },
  actions: {
    queryParamsDidChange: function() {
      // opt into full refresh
      this.refresh();
    },
    willTransition: function(){
      prodController.set('previousTransition', "tomorrow");
    },
    ref:function(){
      this.refresh();
    },
},

/*  setupController: function(controller, model) {
    console.log(model.msg); // "Hold Your Horses"
  }
  */
});

// App.ProductsSeasonalRoute = Ember.Route.extend({
App.ProductsBoardsRoute = Ember.Route.extend({
  model: function () {
    return this.modelFor('products').filterProperty('type', 'boards');
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
    return this.modelFor('products').filterProperty('type', 'robotics');
  }
});

App.ProductsController = Ember.ArrayController.extend({
  needs: "products_index",
  previousTransition: "now",
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
    search: function(params) {
      //console.log(params);
      //debugger;
     // var query = this.get('queryField');
      //.transitionToRoute('products.index', {queryField: query});
      //this.get('controllers.index').send('stuff'); 
      //this.set('query', this.get('queryField'));
      //this.transitionToRoute("products.index");
    }
  },
  onChangeQuery : function () {
          /*var query = this.get("query");            
            this.set('query', this.get('query'));*/
            //this.send('queryParamsDidChange');
            //this.modelRefresher();
            //this.get('controllers.products_index').send('modelRefresher');
        if (this.previousTransition === "today"){
           //console.log(this.previousTransition);
          this.get('controllers.products_index').send('modelRefresher');
        }
        else
          this.transitionToRoute("products.index");
  }.observes("query")
  
});

App.ProductsIndexController = Ember.ArrayController.extend({
  needs: "products",
  modelRefresher: function(){
    this.send('ref');
    //this.get('route.products').send('ref');
  },
});



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

App.ProductDetailComponent = Ember.Component.extend({
  classNameBindings: ['isOnSale'],
  isOnSale: function() {
    return this.get('product.isOnSale');
  }.property(),
    
  actions: {
    buy: function(product){
      this.get('storage').addToCart(this.store, product.title, product.price);
    },

    openModal: function(action, model) {
      this.get('parentView').send('showModal', action, model);
    },
    
    closeModal: function() { 
      this.get('parentView').send('removeModal', action);
    },
  }
    
});
*/
