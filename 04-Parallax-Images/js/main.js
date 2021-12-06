gsap.registerPlugin(ScrollTrigger);

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
                markers: true
            }
        })

    })

}

function init(){
    
    // start here

}

window.addEventListener('load', function(){
    init();
});
