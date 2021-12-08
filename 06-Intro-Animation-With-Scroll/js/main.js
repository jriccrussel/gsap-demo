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
// const progressTween = gsap.to(progressBar, {paused: true, scaleX: 0, ease: 'none', transformOrigin: 'right'});

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
    // .to(loaderInner, {
    //     scaleY: 1,
    //     transformOrigin: 'bottom',
    //     ease: 'power1.inOut'
    // }).addLabel('revealImage')
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

    // GSDevTools.create({paused: true});

}

let bodyScrollBar;

function initImageParallax() {
    
    // select all sections .with-parallax
    gsap.utils.toArray('.with-parallax').forEach(section => {

        // get the image
        const image = section.querySelector('img');

        // create tween for the image
        gsap.to(image, {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                scrub: true
            }
        });
    });
};

function initPinSteps() {
    
    ScrollTrigger.create({
        trigger: '.fixed-nav',
        start: 'top center',
        endTrigger: '#stage4',
        end: 'center center',
        pin: true,
        pinReparent: true
    });

    const getVh = () => {
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        return vh;
    }

    const updateBodyColor = (color) => {
        // gsap.to('.fill-background', { backgroundColor: color, ease: 'none'});
        document.documentElement.style.setProperty('--bcg-fill-color', color);
    }

    gsap.utils.toArray('.stage').forEach((stage, index) => {

        const navLinks = gsap.utils.toArray('.fixed-nav li');

        ScrollTrigger.create({
            trigger: stage,
            start: 'top center',
            end: () => `+=${stage.clientHeight+getVh()/10}`,
            toggleClass: {
                targets: navLinks[index],
                className: 'is-active'
            },
            onEnter: () => updateBodyColor(stage.dataset.color),
            onEnterBack: () => updateBodyColor(stage.dataset.color),
        });
    });
};

function initScrollTo(){

    // find all links and animate to the right position
    gsap.utils.toArray('.fixed-nav a').forEach(link => {

        const target = link.getAttribute('href');

        link.addEventListener('click', (e) => {
            e.preventDefault();
            // gsap.to(window, {duration: 1.5, scrollTo: target, ease: 'Power2.out'});
            bodyScrollBar.scrollIntoView(document.querySelector(target), {damping: 0.07, offsetTop: 100})
        });

    });

};

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

function init(){
    
    // start here
    initLoader();
    initSmoothScrollbar();    
    initImageParallax();
    initPinSteps();
    initScrollTo();
}

window.addEventListener('load', function(){
    init();
});
