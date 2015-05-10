window.App = Ember.Application.createWithMixins({
  LOG_TRANSITIONS: true,
    ready: function() {
        
        function setTyped(){
        
  $(".typed").typed({
    strings: ["<i>Ideas.</i> ^1500<span class='text_blue'>Build it.</span> ^1500<b>Rock on!</b>"],
      loop: true, 
    typeSpeed: 20, 
      contentType: 'html'
  });        
        if($(".text_ideas").length == 0)
            setTimeout(setTyped, 1000);
            
        }
        
    setTimeout(function(){
        setTyped();
            
   }, 1000);
        
  }
});

App.ApplicationRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('cart');
  },
  actions: {
    showModal: function(name, model) {
      console.log('name:' + name);
      //console.log(name);
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
  needs: 'products_index',
  check : false,
  queryField: null,
  itemCounter: function() {
   // console.log(this);
    return this.get('length');
  }.property('length'),
  
  q: Ember.computed.mapBy('model', 'quantity'),
  //totalAmount: Ember.computed.sum('amount'),
  totalItems: Ember.computed.sum('q'),

  /*
  a: Ember.computed.mapBy('model','amount'),
  

  quan: Ember.computed.mapBy('model','quantity'),
  //totalAmount: Ember.computed.sum('amount'),
  totalItems: 9,//Ember.computed.sum('quan'),

  /*
  totalAmount: function(){
    var amount = 0;
    for(var i=0; i < this.get('itemCounter'); ++i)
      amount += (this.get('a')[i] * this.get('quan')[i]);
    return amount.toString();
  }.property('model.@each.a', 'model.@each.quan'),
  */
  actions: {
    deleteItem:function(key){
        var cart = this.store.all('cart');
        var store = this.store;
        var todo = this.get('model');
        todo.deleteRecord();
        todo.save();
    },
    search: function(params) {
      console.log('thisaction');
    },
  },
  onChangeQuery : function () {
          /*var query = this.get("query");            
            this.set('query', this.get('query'));*/
            //this.send('queryParamsDidChange');
            //this.modelRefresher();
            //this.get('controllers.products_index').send('modelRefresher');
       // if (this.previousTransition === "today"){
           //console.log(this.previousTransition);
          this.transitionToRoute('products.index');
          this.set('queryField', this.get('query'));
          //console.log(this.queryField);
          this.get('controllers.products_index').send('modelRefresher');
       // }
       // else
       // this.transitionToRoute('products.index');
  }.observes('query')
});

///////////////////////////
App.ApplicationView = Ember.View.extend({
  prevTop: null,
  isScrolling: false,
  classNameBindings: ['pressed'],
  //isView,
  didInsertElement: function() {
    var view = this;
    // console.log('didInsertElement'); 
  },

  // click: function(event) {
  //   console.log(event);
  //   console.log(event);
  //   console.log(event);
  //   return false;
  // },

  submit: function(event) {

    var top = $("body").scrollTop();
      //if (!this.isScrolling){
        this.set('isScrolling', true)
        if(this.prevTop !== top){
            //console.log(this.isView);
            $('html, body').animate({
              scrollTop: $(scrollToThis).offset().top// + 'px'
            }, 1000, 'swing', function() { 
               // alert("Finished animating");
              // this.set('prevTop', top);
              top = $("body").scrollTop();
            }
          ); 
          this.set('prevTop',top);
         // console.log(this.prevTop);
          this.set('isScrolling',false);
         // console.log(this.isScrolling);
          return this.isView; 
        }
      //}
      
  }
});

///////////////////////////
App.Router.map(function() {
  this.route('credits');
  this.route('about');
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
        
        /*  
          if($(document).ready())
        if(this.get('url') == "/boards" || this.get('url') == "/sensors" || this.get('url') == "/robotics" ){
            $('#scrollToThis').goTo();
        }
        */
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
        console.log('closing item modal');
        this.sendAction('close');
      }.bind(this));
    }.on('didInsertElement')
});

App.CheckoutmodalDialogComponent = Ember.Component.extend({
  /*
  CheckoutButton: (function(){
      return false;
  }).property(),

  noneMe: function(){
    this.get()
  },
  */
  actions: {
    ok: function() {
      $('.modal').modal('hide');
      this.sendAction('ok');
    }
  },
    show: function() { 
    $('.modal').modal().on('hidden.bs.modal', function() {
        console.log('closing checkout modal');
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
      alert('logout Modal');
    }
  }
});

App.RadioButton = Ember.Component.extend({
    tagName : 'input',
    type : 'radio',
    attributeBindings : [ 'name', 'type', 'value', 'checked:checked' ],
    click : function() {
        this.set("selection", this.$().val());
    },
    checked : function() {
        return this.get('value') === this.get('selection');
    }.property('selection')
});

Em.Handlebars.helper('radio-button', App.RadioButton);

App.ExtRadioComponent = Ember.Component.extend({
    name: 'radio'
});


App.CheckoutModalController = Ember.ObjectController.extend({

  itemCounter: function() {
   // console.log(this);
    return this.get('length');
  }.property('length'),
    

  amount: Ember.computed.mapBy('model','amount'),
  quantity: Ember.computed.mapBy('model','quantity'),
  //totalAmount: Ember.computed.sum('amount'),
  totalItems: Ember.computed.sum('quantity'),
  emailIsTrue: Ember.computed.match('email', /^.+@.+\..+$/),
  emailToggle:Ember.computed.not('emailIsTrue'),

  //emailToggle: this.toggleProperty('emailIsTrue'),
  
  totalAmount: function(){
    var amount = 0;
    for(var i=0; i < this.get('itemCounter'); ++i)
      amount += (this.get('amount')[i] * this.get('quantity')[i]);
    return amount.toString();
  }.property('model.@each.amount', 'model.@each.quantity'),
  


  selectedVal: 'bank',

  radioContent: [
        {label: 'Bank', value: 'bank'},
        {label: 'Meetup', value: 'meet'},
        //{label: 'PayPal', value: 'paypal'},
        //{label: 'Credit Card', value: 'cc'},
  ],
  
  optionBank: true,
  optionMeet: false,
  optionPayP: false,    

  onChangeRadio : function () {
      if (this.selectedVal === 'bank'){
        this.set('optionBank', true);
        this.set('optionMeet', false);
      }
      if (this.selectedVal === 'meet'){
        this.set('optionBank', false);
        this.set('optionMeet', true);
      }
  }.observes('selectedVal'),



  disabled: function() {
    return Ember.isEmpty(this.get('firstName'));
  }.property('firstName'),
  
  
  firstName:'Tonny',
  lastName: 'Quintos',
  addressOne: '123 Example St.',
  addressTwo: '1 Subd',
  city: 'Manila',
  usState: 'Metro Manila',
  zipCode: '1234',
  email: 'tonnyquintos@gmail.com',
  phone: '0915',


/*
  fieldChecker: function(){
    return function(data){
      return data = [
       Ember.isEmpty(this.get('firstName')),
       Ember.isEmpty(this.get('address')), 
       Ember.isEmpty(this.get('city')), 
       Ember.isEmpty(this.get('usState')), 
       Ember.isEmpty(this.get('zipCode')), 
       Ember.isEmpty(this.get('email'))
      ];
     }
  }.property('firstName', 'address', 'city', 'usState', 'zipCode', 'email'),
*/

  actions: {
    logout: function() {

    var data = [
      this.get('firstNameToggle'),
      this.get('lastNameToggle'),
      //this.get('emailToggle'),
      //this.get('emailIsTrue'),
      this.get('phoneToggle'),
      this.get('addressOneToggle'),
      this.get('addressTwoToggle'),
      this.get('cityToggle'),
      this.get('stateToggle'),
      this.get('zipToggle'),
    ];

      data.forEach(function(item,index){
        if (item === true){
          console.log('some items are blank');
          return;
        }
      });
      return;

      var address = this.get('addressOne') + " " + this.get('addressTwo') + " " + this.get('city') + " " +  
      this.get('usState') +" " +  this.get('zipCode'); 

      var name = this.get('firstName') +" " +  this.get('lastName') + " ("+this.get('email')+")"; 
      var objects = [];

      this.get('model').content.forEach(function(item, index) { 
        objects.push({
          'productName': item.get('name'),
          'quantity': item.get('quantity'),
          'amount':item.get('amount')
        })
      });

      $.ajax({
        type: "POST",
        url: "/email",
        data: { name: name, address: address, items: objects }
      })

    },

    firstNameToggle: false,
    lastNameToggle: false,
    // emailToggle: false,
    phoneToggle: false,
    addressOneToggle:false,
    addressTwoToggle: false,
    cityToggle: false,
    stateToggle: false,
    zipToggle: false,

    focusOutFirstName: function(params){
      this.set('firstNameToggle', Ember.isEmpty(this.get('firstName')));
      //this.toggleProperty('CheckoutButton');
    },
    focusOutLastName: function(params){
      this.set('lastNameToggle', Ember.isEmpty(this.get('lastName')));
    },
    focusOutEmail: function(params){
      //this.set('emailToggle', Ember.computed.match('email', /^.+@.+\..+$/));
    },
    focusOutPhone: function(params){
      this.set('phoneToggle', Ember.isEmpty(this.get('phone')));
    },
    focusOutAddressOne: function(params){
      this.set('addressOneToggle', Ember.isEmpty(this.get('addressOne')));
    },
    focusOutAddressTwo: function(params){
      this.set('addressTwoToggle', Ember.isEmpty(this.get('addressTwo')));
    },
    focusOutCity: function(params){
      this.set('cityToggle', Ember.isEmpty(this.get('city')));
    },
    focusOutUSState: function(params){
      this.set('stateToggle', Ember.isEmpty(this.get('usState')));
    },
    focusOutZipCode: function(params){
      this.set('zipToggle', Ember.isEmpty(this.get('zipCode')));
    },

  },
});


App.ProductDetailModalController = Ember.ObjectController.extend({
    getTitle: function(){
        return this.get('model').get('title')
    }.property(),
    actions: {
    /*
    getTitle: function(){
        return this.get('title');
    },
    */
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

App.ProductHeaderFiltersTopComponent = Ember.Component.extend({
  actions:{
    scrollToThis:function(){
      console.log('log'); 
      
    },
  },
  /*
  click : function() {
      console.log('log'); 
      //  this.set("selection", this.$().val());
  },
  */

});

// Handlebars
Ember.Handlebars.registerBoundHelper('money', function(value) {
  return accounting.formatMoney(value/100);
});



