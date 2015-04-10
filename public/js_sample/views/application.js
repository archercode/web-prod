ShoppingCart.ApplicationView = Ember.View.extend({
  templateName: 'application'
});

ShoppingCart.RecipeListingsView = Ember.View.extend({
    click: function(event) {
        var content = this.get('content');
        ShoppingCart.selectedProductController.select(content);
    },
    nextRecipe: function(event) {
        ShoppingCart.selectedProductController.next();
    }
});

ShoppingCart.selectedProductView = Ember.View.extend({});

ShoppingCart.RecipeDetailsView = Ember.View.extend({
    contentBinding: 'ShoppingCart.selectedProductController.selectedProduct'
});
