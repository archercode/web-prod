ShoppingCart.GetRecipeItems = function() {
    $.ajax({
        url: '/recipes/',
        dataType: 'json',
        success : function(data) {
            for (var i = 0, len = data.length; i < len; i++) {
                ShoppingCart.productsController.addItem(ShoppingCart.Recipe.create({    
                    title:       data[i]['title'],
                    price:       data[i]['price'],
                    description: data[i]['description'],
                    type:        data[i]['type'],
                    image:       data[i]['image']
                }));
            }
        } });
};


    