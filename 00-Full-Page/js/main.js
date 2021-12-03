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
    const { offsetX, offsetY, target } = e; // 'offsetX, offsetY' - mouse position
    const {clientWidth, clientHeight} = target; // 'clientWidth, clientHeight' - determines the size of the current width && height of the header
    // console.log(offsetX, offsetY,clientWidth, clientHeight);

    // get 0 0 in the center
    const xPos = offsetX / clientWidth - 0.5
  const yPos = offsetY / clientHeight - 0.5

    const leftImages = gsap.utils.toArray('.hg__left .hg__image');
    const rightImages = gsap.utils.toArray('.hg__right .hg__image');

    const modifier = (index) => index * 1.2 + 0.5; 

    // move left 3 images
    // TAKE NOTE: make sure ang container(ang 'header') naa css na 'perspective: 1000px' to make the tilt effect
    leftImages.forEach((image, index) => { // 'index' refering to an array of indexes sa '.hg__image' that has 3
        gsap.to(image, {
            duration: 1.2,
            // x: xPos * 20,
            // y: yPos * 30,
            x: xPos * 20 * modifier(index), // make images move base sa X Position sa mouse
            y: yPos * 30 * modifier(index), // make images move base sa Y Position sa mouse
            rotationY: xPos * 40, // move base mouse Y position || tilt will not work if the positions 'rotationY' && 'yPos' are the same 
            rotationX: yPos * 10, // move base mouse X position || tilt will not work if the positions 'rotationX' && 'xPos' are the same 
            ease:'Power3.out'
        })
    })

    rightImages.forEach((image, index) => { 
        gsap.to(image, {
            duration: 1.2,
            x: xPos * 20 * modifier(index), 
            y: -yPos * 30 * modifier(index), 
            rotationY: xPos * 40,
            rotationX: yPos * 10, 
            ease:'Power3.out'
        })
    })

    gsap.to('.decor__circle', {
        duration: 1.7,
        x: 100 * xPos,
        y: 120 * yPos,
        ease:'Power4.out'
    })

}

function init(){    
    // Calling the function to run
    initNavigation();
    initHeaderTilt();
}

window.addEventListener('load', function(){
    init(); 
});
