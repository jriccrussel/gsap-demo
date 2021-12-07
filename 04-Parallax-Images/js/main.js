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
        // markers: true
    });

    // get true hieght even sa mobile
    const getVh = () => {
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        return vh;
    };

    const updateBodyColor = (color) => {
        // gsap.to('.fill-background', { backgroundColor: color, ease: 'none' }); // gsap method
        document.documentElement.style.setProperty('--bcg-fill-color', color); // js method
    }

    gsap.utils.toArray('.stage').forEach((stage, index) => {
        
        // NAVIGATION LINKS
        const navLinks = gsap.utils.toArray('.fixed-nav li');

        ScrollTrigger.create({
            trigger: stage,
            start: 'top center',
            //end: `+=${stage.clientHeight}`, // very end sa section || in mobile mag overlap cya
            end: () => `+=${stage.clientHeight+getVh()/10}`, // can find the true height even sa mobile
            toggleClass: { // nav links will set to active base sa section
                targets: navLinks[index],
                className: 'is-active'
            },
            // markers: true,
            onEnter: () => updateBodyColor(stage.dataset.color),
            onEnterBack: () => updateBodyColor(stage.dataset.color),
        });


    });

}

// SCROLL TO SECTION
function initScrollTo(){
    
    // find all links and animate to the right position
    gsap.utils.toArray('.fixed-nav a').forEach(link => {

        // target anchor links
        const target = link.getAttribute('href');

        link.addEventListener('click', (e) => {
            e.preventDefault();
            gsap.to(window, {duration: 1.5, scrollTo: target, ease: 'Power2.out'});
        })

    })

}

function init(){
    
    // start here
    initImageParallax();
    initPinSteps();
    initScrollTo();

}

window.addEventListener('load', function(){
    init();
});
