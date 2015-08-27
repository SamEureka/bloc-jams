var pointsArray = document.getElementsByClassName('point');

var animatePoints = function (points) {
    

    var revealPoint = function () {
        for (var i in points) {
            points[i].style.opacity = 1;
            points[i].style.transform = "rotate(7deg) scaleX(1) translateY(0)";
            points[i].style.msTransform = "rotate(7deg) scaleX(1) translateY(0)";
            points[i].style.WebkitTransform = "rotate(7deg) scaleX(1) translateY(0)";
        }
    };

    revealPoint();
};
window.onload = function() {
    
    // had to change height from 950 to 850 //Sam
    if (window.innerHeight > 850) {
    animatePoints(pointsArray);
    }
    
window.addEventListener('scroll', function(event) {

    if (pointsArray[0].getBoundingClientRect().top <= 400){
        animatePoints(pointsArray);
    }
    
});
}
