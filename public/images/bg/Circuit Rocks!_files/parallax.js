$.fn.goTo = function() {
    if($(this).offset() != undefined){
        $('html, body').animate({
            scrollTop: $(this).offset().top + 'px'
        }, 'fast');
    }
    return this; // for chaining...
};


/**
if on screen func; please move me :( 
https://github.com/moagrius/isOnScreen
*/
$.fn.isOnScreen = function(){
    var viewport = {};
    viewport.top = $(window).scrollTop() + 60;
    viewport.bottom = viewport.top + $(window).height();
    var bounds = {};
    bounds.top = this.offset().top;
    bounds.bottom = bounds.top + this.outerHeight();
    return ((bounds.top <= viewport.bottom) && (bounds.bottom >= viewport.top));
};


/**
Parallax
http://untame.net/2013/04/how-to-integrate-simple-parallax-with-twitter-bootstrap/
*/

$(document).ready(function(){
   // cache the window object
   $window = $(window);
 
   $('section[data-type="background"]').each(function(){
     // declare the variable to affect the defined data-type
     var $scroll = $(this);
                     
      $(window).scroll(function() {
        // HTML5 proves useful for helping with creating JS functions!
        // also, negative value because we're scrolling upwards                             
        var yPos = -($window.scrollTop() / $scroll.data('speed')); 
         
        // background position
        var coords = '50% '+ yPos + 'px';
 
        // move the background
        $scroll.css({ backgroundPosition: coords });    
          
           
          
      }); // end window scroll
   });  // end section function
    
    $window.scroll(function(){
    
        if(!$('#home_header').isOnScreen()){
            $("#prod_filters").addClass('shown')
        }else{
            $("#prod_filters").removeClass('shown')
        }
    });
    
}); // close out script
