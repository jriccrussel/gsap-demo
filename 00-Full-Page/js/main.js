gsap.registerPlugin(ScrollTrigger);

function initNavigation(){

    const mainNavLinks = gsap.utils.toArray('.main-nav a');

    // Hover class animate
    mainNavLinks.forEach(link => {
        link.addEventListener('mouseleave', e => {
            link.classList.add('animate-out'); // when ang link(navigation link) is hovered then run class animate

            setTimeout(() => {
                link.classList.remove('animate-out') // if dili cya hovered(navigation link) then remove class animate
            }, 300)
        })
    })

    // Nav Links Animation Function moves down after scrolling
    function navAnimation(){
        return gsap.to(mainNavLinks, {
            duration: 1,
            stagger: 0.5,
            autoAlpha: 0,
            y: 20
        })
    }

    // hamburger move right after scrolled ==> 'has-scrolled'
    // logo opacity 0 after scrolled ==> 'has-scrolled'
    // Nav Links moves down after scrolling ==> 'onEnter: () => navAnimation()'
    ScrollTrigger.create({
        start: 100,
        toggleClass: {
            targets: 'body',
            className: 'has-scrolled'
        },
        onEnter: () => navAnimation(),
        markers: false
    })
    
}

function init(){    
    // Calling the function to run
    initNavigation();
}

window.addEventListener('load', function(){
    init(); 
});
