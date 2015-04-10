App.CheckoutRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('cart');
  }
});

App.CheckoutController = Ember.ArrayController.extend({
  itemCount: Ember.computed.alias('length'),

   itemOrderCount: Ember.computed.alias('length'),

  filterComputed: function() {
    return this.filter(function(item, index, enumerable){
	    return item.get('amount') > 0;
	  });
    	//'amount', 0);
  }.property('@each.amount'),

  /*
  subTotal: function() {
        var users = this.get("model").content;
        var ret = 0;
        users.forEach(function(user){
            ret += user.get("amount");
        });
        return ret;
    }.property("@each.amount"),
  */
  
  amount: Ember.computed.mapBy('model', 'amount'),
  subTotal: Ember.computed.sum('amount'),
	
});
