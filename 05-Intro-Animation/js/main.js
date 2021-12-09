gsap.registerPlugin(ScrollTrigger);

const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

const loader = select('.loader');
const loaderInner = select('.loader .inner');
const progressBar = select('.loader .progress');
const loaderMask = select('.loader__mask');

// show loader on page load
gsap.set(loader, {autoAlpha: 1});

// scalde loader down
// sa first load ang 'loaderInner' na set to 'scaleY: 0.005'(mura height nya but sa css nya g transform translate)
gsap.set(loaderInner, {scaleY: 0.005, transformOrigin: 'bottom'});

// make a tween that scales the loader 
// then ang progress bar(sa sulod mura dark blue) mo animate to the right
// gsap.to(progressBar, {scaleX: 0, ease: 'none', transformOrigin: 'right'});
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
    // increase the number of loaded images
    loadedImageCount++;
    // update progress
    updateProgress( loadedImageCount );
});

function updateProgress( value ) { 
    // console.log(value/imageCount)
    // tween progress bar tween to the right value
    gsap.to(progressTween, {
        progress: value/imageCount,
        duration: 0.3,
        ease: 'power1.out'
    })
}

imgLoad.on( 'done', function( instance ) {
    // we will simply init our loader animation onComplete
    gsap.set(progressBar, {
        autoAlpha: 0,
        onComplete: initPageTransitions
    });
});

// Loader
function initLoader(){

    // Loader Animate In
    const tlLoaderIn = gsap.timeline({
        id: 'tlLoaderIn',
        defaults: {
            duration: 1.1,
            ease: 'power2.out'
        },
        onComplete: () => select('body').classList.remove('is-loading')
    });

    const loaderInner = select('.loader .inner');
    const image = select('.loader__image img');
    const mask = select('.loader__image--mask');
    const line1 = select('.loader__title--mask:nth-child(1) span'); // TItle 1
    const line2 = select('.loader__title--mask:nth-child(2) span'); // TItle 2
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
            duration: 1.2,
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

    // GSDevTools.create({paused: true});

}

function pageTransitionIn({el}){
    console.log('pageTransitionIn');
    // timeline to stretch the loader over the whole screen
    const tl = gsap.to('.transition', {
        duration: 1.2,
        yPercent: -100,
        ease: 'power1.inOut'
    });

    tl.set(loaderInner, { autoAlpha: 0 })
    .fromTo(loader, { yPercent: -100 }, {yPercent: 0 })
    fromTo(loaderMask, { yPercent: 80 }, {yPercent: 0 }, 0)
    .to(container,{y:150}, 0);

    return tl;
}

function pageTransitionOut({el}){
    console.log('pageTransitionOut');

    // timeline to move loader out moving down
    const tl = gsap.to('.transition', {
        duration: 1.2,
        yPercent: 0,
        ease: 'power1.inOut'
    });

    tl.to(loader, { yPercent: 100 })
    .to(loaderMask, { yPercent: -80 }, 0)
    .from(container,{y:-150}, 0);

    return tl;
}

function initPageTransitions(){

    // do something before the transition starts
    barba.hooks.before(() => {
        select('html').classList.add('is-transitioning');
    });
    // do something after the transition finishes
    barba.hooks.after(() => {
        select('html').classList.remove('is-transitioning');
    });

    // scroll to the top of the page
    barba.hooks.enter(() => {
        window.scrollTo(0, 0);
    });

    barba.init({
        transitions: [{
            once() {
                // do something once on the initial page load
                initLoader();
            },
            async leave({current}) {
                // animate loading screen in
                await pageTransitionIn(current);
                console.log(current);
            },
            enter({next}) {
                // animate loading screen away
                pageTransitionOut(next);
                console.log(next);
            }
        }]
    });
}

// function init(){
    
//     // start here
//     initLoader();
// }

// window.addEventListener('load', function(){
//     init();
// });
