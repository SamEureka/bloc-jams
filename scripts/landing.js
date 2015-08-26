var animatePoints = function () {
    "use strict";
    var points = document.getElementsByClassName('point');

    var revealPoint = function () {
        for (var i = 0; i < points.length; i++) {
            points[i].style.opacity = 1;
            points[i].style.transform = "rotate(7deg) scaleX(1) translateY(0)";
            points[i].style.msTransform = "rotate(7deg) scaleX(1) translateY(0)";
            points[i].style.WebkitTransform = "rotate(7deg) scaleX(1) translateY(0)";
        }
    };


    revealPoint();
};
animatePoints();