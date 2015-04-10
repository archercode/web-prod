ShoppingCart.ApplicationController = Ember.Controller.extend();

ShoppingCart.productsController = Ember.ArrayController.createWithMixins({
    content: [],
    addItem: function(item) {
        this.addObject(item);
    }});

ShoppingCart.selectedProductController = Ember.ObjectController.createWithMixins({
    selectedProduct: [],
    select: function(item) {
        this.set('selectedProduct', item);
    }});

