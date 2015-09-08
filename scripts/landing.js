var animatePoints = function () {
    
    var revealPoint = function() {
        $(this).css({
            opacity: 1,
            transform: 'scaleX(1) translateY(0)'
        });
    };
      $.each($('.point'), revealPoint);  
    
};

$(window).load(function() {
    
    // had to change height from 950 to 850 //Sam
    if ($(window).height() > 850) {
    animatePoints();
    }
    
$(window).scroll(function(event) {

    if ($(window).scrollTop() >= 400){
        animatePoints();
    }
    
});
});
