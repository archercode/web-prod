
// Products
App.ProductsRoute = Ember.Route.extend({
  /*model: function() {
    return this.store.findAll('product');
  },
  */model: function() {
    var url = '/recipes/';
    //'https://api.github.com/repos/emberjs/ember.js/pulls';
    var store = this.store;

    return Ember.$.getJSON(url).then(function(data) {
        console.log('got data from recipes');
        console.log(data);


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
  },
  
  /*addItem: function(item) {
        this.addObject(item);
  }*/

});


App.ProductsIndexRoute = Ember.Route.extend({
  model: function () {
    return this.modelFor('products');
  }
});
App.ProductsSeasonalRoute = Ember.Route.extend({
  model: function () {
    return this.modelFor('products').filterProperty('isSeasonal', true);
  }
});
App.ProductsSaleRoute = Ember.Route.extend({
  model: function () {
    return this.modelFor('products').filterBy('isOnSale');
  }
});


App.ProductsSensorRoute = Ember.Route.extend({
  model: function () {
    return this.modelFor('products').filterProperty('type', 'sensor');
  }
});

App.ProductsMicrocontrollerRoute = Ember.Route.extend({
  model: function () {
    return this.modelFor('products').filterProperty('type', 'microcontroller');
  }
});






App.ProductsController = Ember.ArrayController.extend({
  sortProperties: ['title'],
  count: function() {
    
    console.log(this);

    return this.get('length');
  }.property('length'),

  // Slides
  onSale: function() {
    return this.filterBy('isOnSale').get('length');
  }.property('@each.isOnSale'),

  // Challenges
  seasonal: function () {
    return this.filterBy('isSeasonal').get('length');
  }.property('@each.isSeasonal'),
    
  sensor: function () {
    
    return this.filterBy('type','sensor').get('length');
  }.property('@each.type'),
 
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
    openModal: function(action, model) {
      this.get('parentView').send('showModal', action, model);
    },
    
    closeModal: function() { 
      this.get('parentView').send('removeModal', action);
    }
  }
    
});
