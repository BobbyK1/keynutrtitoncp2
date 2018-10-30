$(document).ready(function(){
    var scrollTop = 0;
    $(window).scroll(function(){
        scrollTop = $(window).scrollTop();
        $('.counter').html(scrollTop);
      
        if (scrollTop >= 100) {
            $('#global-nav').removeClass('shrink');
            $('#global-nav').addClass('grow');
        } else if (scrollTop < 100) {
            $('#global-nav').addClass('shrink');
            $('#global-nav').removeClass('grow');
        } 
    });     
});