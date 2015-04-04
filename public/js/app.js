ShoppingCart = Ember.Application.createWithMixins({
	ready: function() {
		ShoppingCart.GetRecipeItems();   // this triggers an AJAX call to Clojure REST interface
	}
});

