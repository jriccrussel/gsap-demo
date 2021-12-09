gsap.registerPlugin(ScrollTrigger);

const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

const loader = select('.loader');
const loaderInner = select('.loader .inner');
const progressBar = select('.loader .progress');

// show loader on page load
gsap.set(loader, {autoAlpha: 1});

// scalde loader down
// sa first load ang 'loaderInner' na set to 'scaleY: 0.005'(mura height nya but sa css nya g transform translate)
gsap.set(loaderInner, {scaleY: 0.005, transformOrigin: 'bottom'});

// make a tween that scales the loader 
// then ang progress bar(sa sulod mura dark blue) mo animate to the right
gsap.to(progressBar, {scaleX: 0, ease: 'none', transformOrigin: 'right'});

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
    .add(tlLoaderOut)

    GSDevTools.create({paused: true});

}

function pageTransitionIn(){
    console.log('pageTransitionIn');
    return gsap.to('.transition', {
        duration: 1,
        yPercent: -100,
        ease: 'power1.inOut'
    });
}

function pageTransitionOut(){
    console.log('pageTransitionOut');
    return gsap.to('.transition', {
        duration: 1,
        yPercent: 0,
        ease: 'power1.inOut'
    });
}

function initPageTransition(){
    barba.init({
        transitions: [{
            once(){
                // initiate once on the initial page load
                initLoader();
            },
            async leave(){
                // animate loading screen in
                await pageTransitionIn();
            },
            enter(){
                // animate loadin screen out
                pageTransitionOut();
            }
        }]
    })
}

// function init(){
    
//     // start here
//     initLoader();
// }

// window.addEventListener('load', function(){
//     init();
// });
