gsap.registerPlugin(ScrollTrigger);

// PARALLAX
function initImageParallax(){
    
    // select all sections .with parallax
    gsap.utils.toArray('.with-parallax').forEach(section => {

        // get time image
        const image = section.querySelector('img');

        // create tween for time iamge
        gsap.to(image, {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                scrub: true,
                // markers: true
            }
        });

    });
}

// PIN NAVIGATION
function initPinSteps(){

    ScrollTrigger.create({
        trigger: '.fixed-nav',
        start: 'top center',
        endTrigger: '#stage4',
        end: 'center center',
        pin: true,
        markers: true
    });

}

function init(){
    
    // start here
    initImageParallax();
    initPinSteps();

}

window.addEventListener('load', function(){
    init();
});
