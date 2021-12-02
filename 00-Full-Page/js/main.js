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
    
}

function init(){    
    // Calling the function to run
    initNavigation();
}

window.addEventListener('load', function(){
    init(); 
});
