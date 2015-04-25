/*

App.CheckoutModalController = Ember.ArrayController.extend({
  	firstName: 'Kerrick',
    address: '123 Example St.',
    city: 'Saint Louis',
    usState: 'Missouri',
    zipCode: '63101',
    email: 'me@kerricklong.com',

    action:{
       deleteItem:function(args){
        console.log(args);
      }
    },


   // itemCount: Ember.computed.alias('length'),
  itemOrderCount: Ember.computed.alias('length'),

	filterComputed: function() {
	return this.filter(function(item, index, enumerable){
	    return item.amount > 0;//item.get('amount') > 0;
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
  
  
  quantity:function(){
    //var q = this.get('model').content;


  },
  
	amount: Ember.computed.mapBy('model', 'amount'),
	subTotal: Ember.computed.sum('amount'),
});
*/
