var pointsArray = document.getElementsByClassName('point');

function animatePoints(index) {
            index.style.opacity = 1;
            index.style.transform = "rotate(7deg) scaleX(1) translateY(0)";
            index.style.msTransform = "rotate(7deg) scaleX(1) translateY(0)";
            index.style.WebkitTransform = "rotate(7deg) scaleX(1) translateY(0)";
        }


window.onload = function() {
    
    // had to change height from 950 to 850 //Sam
    if (window.innerHeight > 850) {
    console.log(animatePoints);
        forEach(animatePoints);
    }
    
window.addEventListener('scroll', function(event) {

    if (pointsArray[0].getBoundingClientRect().top <= 400){
        forEach(animatePoints);
    }
    
});
}
