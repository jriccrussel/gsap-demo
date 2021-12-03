gsap.registerPlugin(ScrollTrigger);

// Navigation Animaation
function initNavigation(){

    const mainNavLinks = gsap.utils.toArray('.main-nav a'); // navigation links || animation fade move from left to right
    const mainNavLinksRev = gsap.utils.toArray('.main-nav a').reverse(); // navigation links || animation move from right to left

    // Hover class animate
    mainNavLinks.forEach(link => {
        link.addEventListener('mouseleave', e => {
            link.classList.add('animate-out'); // when ang link(navigation link) is hovered then run class animate

            setTimeout(() => {
                link.classList.remove('animate-out') // if dili cya hovered(navigation link) then remove class animate
            }, 300);
        });
    })

    // Nav Links Animation Function moves down after scrolling
    function navAnimation({direction}){
        const scrollingDown = direction === 1; // scrolled down
        const links = scrollingDown ? mainNavLinks : mainNavLinksRev

        //return gsap.to(mainNavLinks, { 
        return gsap.to(links, { 
            duration: 0.3,
            stagger: 0.05,
            // autoAlpha: 0,
            autoAlpha: () => scrollingDown ? 0 : 1, // '0'- after scroll hide || '1' = after scroll top show 
            // y: 20,
            y: () => scrollingDown ? 20 : 0, // '20'- after scroll position move down || '0' = after scroll top back to its original position
            ease: 'Power4.out',
        });
    }

    // hamburger move right after scrolled ==> 'has-scrolled'
    // logo opacity 0 after scrolled ==> 'has-scrolled'
    // Nav Links moves down after scrolling ==> 'onEnter: () => navAnimation()'
    ScrollTrigger.create({
        start: 100,
        end: 'bottom bottom-=200',
        toggleClass: {
            targets: 'body',
            className: 'has-scrolled'
        },
        onEnter: ({direction}) => navAnimation({direction}), // Scrolled down nav links go away
        onLeaveBack: ({direction}) => navAnimation({direction}), // Scrolled at the top nav links appears/show
        markers: false
    })
    
}

// Header Animation
function initHeaderTilt(){
    document.querySelector('header').addEventListener('mousemove', moveImages);

}

function moveImages(e){
    const {offsetX, offsetY, target} = e;
    const {clientWidth, clientHeight} = target;

    console.log(offsetX, offsetY,clientWidth, clientHeight);
}

function init(){    
    // Calling the function to run
    initNavigation();
    initHeaderTilt();
}

window.addEventListener('load', function(){
    init(); 
});
