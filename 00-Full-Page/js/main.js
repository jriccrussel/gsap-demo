gsap.registerPlugin(ScrollTrigger);

// Navigation Animaation
function initNavigation(){

    const mainNavLinks = gsap.utils.toArray('.main-nav a');
    const mainNavLinksRev = gsap.utils.toArray('.main-nav a').reverse();

    mainNavLinks.forEach(link => {
        link.addEventListener('mouseleave', e => {

            // add class
            link.classList.add('animate-out');

        });
        link.ontransitionend = function() {
            //remove class
            link.classList.remove('animate-out');
        }
    });

    function navAnimation(direction){
        const scrollingDown = direction === 1;
        const links = scrollingDown ? mainNavLinks : mainNavLinksRev;
        return gsap.to(links, {
            duration: 0.3, 
            stagger: 0.05, 
            autoAlpha: () => scrollingDown ? 0 : 1, 
            y: () => scrollingDown ? 20 : 0,
            ease: 'power4.out'
        });
    }

    // updated trigger to #main instead of absolute 100
    ScrollTrigger.create({
        trigger: '#main',
        start: 'top top-=100',
        end: 'bottom bottom-=200',
        toggleClass: {
            targets: 'body',
            className: 'has-scrolled'
        },
        onEnter: ({direction}) => navAnimation(direction),
        onLeaveBack: ({direction}) => navAnimation(direction),
        // markers: true
    });
}
// End Navigation Animation

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

// REVEAL GALLERY
function initHoverReveal() {
    const sections = document.querySelectorAll('.rg__column');
    sections.forEach(section => {

        // console.log(section)

        // get components/div for animation
        // const imageBlock = section.querySelector('.rg__image');
        // const mask = section.querySelector('.rg__image--mask');

        // Para ang 'createHoverReveal(e)' maka access sa 'imageBlock, mask' change from 'const mask' ==> 'section.mask'
        // To access 'section.mask, section.imageBlock' to 'createHoverReveal(e)' we need to destructure it and define it as 'e.target' ==> 'const {imageBlock, mask} = e.target;'
        section.imageBlock = section.querySelector('.rg__image');
        section.image = section.querySelector('.rg__image img');
        section.mask = section.querySelector('.rg__image--mask');
        section.text = section.querySelector('.rg__text');
        section.textCopy = section.querySelector('.rg__text--copy');
        section.textMask = section.querySelector('.rg__text--mask');
        section.textP = section.querySelector('.rg__text--copy p');

        // reset the initial position
        // gsap.set(imageBlock, {yPercent: -101});
        // gsap.set(mask, {yPercent: 100});
        gsap.set([section.imageBlock, section.textMask], { yPercent: -101});
        gsap.set([section.mask, section.textP], { yPercent: 100});
        gsap.set(section.image, { scale: 1.2 })

        // add event listeners to each section
        section.addEventListener('mouseenter', createHoverReveal);
        section.addEventListener('mouseleave', createHoverReveal);

    })
}
// END REVEAL GALLERY


// HOVER REVEAL
function getTextHeight(elem){
    return elem.clientHeight;
}

function createHoverReveal(e){
    // console.log(e);
    // console.log(e.type);
    
    // console.log(e.target);
    const {imageBlock, mask, text, textCopy, textMask, textP, image } = e.target;
    // why 'e.target' remember it was pass from 'const sections'(parent) && then we forEach to gain access sulod sa 'sections', basically 'sections' was the target therefore we gain access sa iyang properties which has 'section.imageBlock, section.mask'
    // console.log(imageBlock, mask);

    let tl = gsap.timeline({
        defaults: {
            duration: 0.7,
            ease: 'Power4.out'
        }
    }); 

    if (e.type === "mouseenter") {
        
        tl.to([mask, imageBlock, textMask, textP], { yPercent: 0 })
        .to(text, {y: () => -getTextHeight(textCopy)/2}, 0)
        .to(image, {duration: 1.1, scale: 1}, 0);
            // .to(text, {y: () => -textCopy.clientHeight / 2}, 0);
            // .to(text, {y: -textHeight / 2})
        
    } else if (e.type === "mouseleave")  {

        tl.to([mask, textP], {yPercent: 100})
        .to([imageBlock, textMask], {yPercent: -101}, 0)
        .to(text, {y: 0}, 0)
        .to(image, {duration: 1.1, scale: 1.2}, 0);

    }

    return tl;
}
// END HOVER REVEAL


// PORTFOLIO
const allLinks = gsap.utils.toArray('.portfolio__categories a');
const pageBackground = document.querySelector('.fill-backgroud');
const largeImage = document.querySelector('.portfolio__image--l');
const smallImage = document.querySelector('.portfolio__image--s');
const lInside = document.querySelector('.portfolio__image--l .image_inside');
const sInside = document.querySelector('.portfolio__image--s .image_inside');

function initPortfolioHover() {
    allLinks.forEach(link => {
        link.addEventListener('mouseenter', createPortfolioHover);
        link.addEventListener('mouseleave', createPortfolioHover);
        link.addEventListener('mousemove', createPortfolioMove);
    });
}

// HOver
function createPortfolioHover(e){
    if(e.type === 'mouseenter'){

        // change images to the right urls
        // fade in images
        // all siblings to white and fade out
        // active link to white
        // update page background color
        
        // dataset coming from the html 'data-imagelarge'
        const { color, imagelarge, imagesmall } = e.target.dataset;
        // console.log(color, imagelarge, imagesmall);

        const allSiblings = allLinks.filter(item => item !== e.target);
        const tl = gsap.timeline();

        tl.set(lInside, { backgroundImage: `url(${imagelarge})` })
        .set(sInside, { backgroundImage: `url(${imagesmall})` })
        .to([largeImage, smallImage], { autoAlpha: 1 })
        .to(allSiblings, { color: '#fff', autoAlpha: 0.2 }, 0)
        .to(e.target, { color: '#fff', autoAlpha: 1 }, 0)
        .to(pageBackground, { backgroundColor: color, ease: 'none' }, 0);
        

    } else if(e.type === 'mouseleave'){

        // fade out images
        // all links back to black
        // change background color back to default #ACB7AB
        const tl = gsap.timeline();

        tl.to([largeImage, smallImage], { autoAlpha: 0 })
        .to(allLinks, {color: '#000000', autoAlpha: 1 }, 0)
        .to(pageBackground, { backgroundColor: '#ACB7AB', ease: 'none' }, 0)

    }
}

// When Hovered Image move
function createPortfolioMove(e){

    const { clientY } = e;

    // move large image
    gsap.to(largeImage, {
        duration: 1.2,
        // y: -(document.querySelector('.portfolio__categories').clientHeight - clientY) / 6,
        y: getPortfolioOffset(clientY) / 6,
        ease: 'Power3.inOut'
    })

    // move small image
    gsap.to(smallImage, {
        duration: 1.2,
        // y: -(document.querySelector('.portfolio__categories').clientHeight - clientY) / 3,
        y: getPortfolioOffset(clientY) / 3,
        ease: 'Power3.inOut'
    })

}

function getPortfolioOffset(clientY) {
    return -(document.querySelector('.portfolio__categories').clientHeight - clientY);
}

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
// END PARALLAX

// PIN NAVIGATION
function initPinSteps(){

    ScrollTrigger.create({
        trigger: '.fixed-nav',
        start: 'top center',
        endTrigger: '#stage4',
        end: 'center center',
        pin: true,
        // markers: true
        pinReparent: true
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
// END PIN NAVIGATION

let bodyScrollBar;

// SCROLL TO
function initScrollTo(){

    // find all links and animate to the right position
    gsap.utils.toArray('.fixed-nav a').forEach(link => {

        const target = link.getAttribute('href');

        link.addEventListener('click', (e) => {
            e.preventDefault();
            // gsap.to(window, {duration: 1.5, scrollTo: target, ease: 'Power2.out'});
            console.log(select(target));
            bodyScrollBar.scrollIntoView(document.querySelector(target), {
                damping: 0.07, 
                offsetTop: 100
            })
        });

    });

};
// END SCROLL TO

// SMOOTH SCROLLING
function initSmoothScrollbar(){
     
    // Smooth Scrollbar
    // Scrollbar.init(document.querySelector('#viewport'));
    bodyScrollBar = Scrollbar.init(document.querySelector('#viewport'), {damping: 0.07});

    // removehorizontal scrollbar
    bodyScrollBar.track.xAxis.element.remove();

    // keep ScrollTrigger in sync with Smooth Scrollbar
    ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
            if (arguments.length) {
                bodyScrollBar.scrollTop = value; // setter
            }
            return bodyScrollBar.scrollTop;    // getter
        }
    });
    
    // when the smooth scroller updates, tell ScrollTrigger to update() too: 
    bodyScrollBar.addListener(ScrollTrigger.update);
}
// END SMOOTH SCROLLING

// function init(){    

//     initSmoothScrollbar(); 
//     // Calling the function to run
//     initNavigation();
//     initHeaderTilt();

//     // HOVER REVEAL
//     initHoverReveal();

//     // PORTFOLIO
//     initPortfolioHover();

//     // PARALLAX
//     initImageParallax();
//     initPinSteps();
// }

// window.addEventListener('load', function(){
//     init(); 
// });

// LOADER MAIN
const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

const loader = select('.loader');
const loaderInner = select('.loader .inner');
const progressBar = select('.loader .progress');
const loaderMask = select('.loader__mask');

function init(){
    gsap.set(loader, {autoAlpha: 1});

    gsap.set(loaderInner, {scaleY: 0.005, transformOrigin: 'bottom'});

    const progressTween = gsap.to(progressBar, {
        paused: true, 
        scaleX: 0, 
        ease: 'none', 
        transformOrigin: 'right'
    });

    let loadedImageCount = 0, imageCount;
    const container = select('#main');

    const imgLoad = imagesLoaded( container );
    imageCount = imgLoad.images.length;

    updateProgress(0);

    imgLoad.on( 'progress', function() {
        
        loadedImageCount++;
        updateProgress( loadedImageCount );
    });

    function updateProgress( value ) { 
        
        gsap.to(progressTween, {
            progress: value/imageCount,
            duration: 0.3,
            ease: 'power1.out'
        })
    }

    imgLoad.on( 'done', function( instance ) {
        gsap.set(progressBar, {
            autoAlpha: 0,
            onComplete: initPageTransitions
        });
    });
}

init();

// Loader
function initLoader(){

    const tlLoaderIn = gsap.timeline({
        id: 'tlLoaderIn',
        defaults: {
            duration: 1.1,
            ease: 'power2.out'
        },
        // onComplete: () => select('body').classList.remove('is-loading')
        onComplete: () => initContent()
    });

    const loaderInner = select('.loader .inner');
    const image = select('.loader__image img');
    const mask = select('.loader__image--mask');
    const line1 = select('.loader__title--mask:nth-child(1) span');
    const line2 = select('.loader__title--mask:nth-child(2) span'); 
    const lines = selectAll('.loader__title--mask');
    const loaderContent = select('.loader__content');

    tlLoaderIn
    .set(loaderContent, {autoAlpha: 1})
    .from(loaderInner, {
        scaleY: 0,
        transformOrigin: 'bottom'
    }).addLabel('revealImage')
    .from(mask, {yPercent: 100}, 'revealImage-=0.6')  
    .from(image, {yPercent: 100}, 'revealImage-=0.6')
    .from([line1, line2], {yPercent: 100, stagger: 0.1}, 'revealImage-=0.4');

    // Loader Animate Out
    const tlLoaderOut = gsap.timeline({
        id: 'tlLoaderOut',
        defaults: {
            duration: 0.8,
            ease: 'power2.inOut'
        },
        delay: 1
    })

    tlLoaderOut
    .to(lines, {yPercent: -500, stagger: 0.2}, 0)
    .to([loader, loaderContent], {yPercent: -100}, 0.2)
    .from('#main', {y: 150}, 0.2);

    const tlLoader = gsap.timeline();

    tlLoader
    .add(tlLoaderIn)
    .add(tlLoaderOut);
}

function pageTransitionIn({container}){
    console.log('pageTransitionIn');
    
    const tl = gsap.timeline({
        defaults: {
          duration: 0.8,
          ease: 'power1.inOut'
        }
    });

    tl.set(loaderInner, { autoAlpha: 0 })
    .fromTo(loader, { yPercent: -100 }, {yPercent: 0 })
    .fromTo(loaderMask, { yPercent: 80 }, {yPercent: 0 }, 0)
    .to(container,{y:150}, 0);

    return tl;
}

function pageTransitionOut({container}){
    console.log('pageTransitionOut');
    
    const tl = gsap.timeline({
        defaults: {
          duration: 0.8,
          ease: 'power1.inOut'
        },
        onComplete: () => initContent()
    });

    tl.to(loader, { yPercent: 100 })
    .to(loaderMask, { yPercent: -80 }, 0)
    .from(container,{y:-150}, 0);

    return tl;
}

function initPageTransitions(){

    barba.hooks.before(() => {
        select('html').classList.add('is-transitioning');
    });

    barba.hooks.after(() => {
        select('html').classList.remove('is-transitioning');
    });

    barba.hooks.enter(() => {
        window.scrollTo(0, 0);
    });

    barba.init({
        transitions: [{
            once() {
                initLoader();
            },
            async leave({current}) {
                await pageTransitionIn(current);
                console.log(current);
            },
            enter({next}) {
                pageTransitionOut(next);
                console.log(next);
            }
        }]
    });
}
// END LOADER MAIN


function initContent(){

    select('body').classList.remove('is-loading');
    initSmoothScrollbar(); 
    // Calling the function to run
    initNavigation();
    initHeaderTilt();

    // HOVER REVEAL
    initHoverReveal();

    // PORTFOLIO
    initPortfolioHover();

    // PARALLAX
    initImageParallax();
    initPinSteps();
    initScrollTo();
}