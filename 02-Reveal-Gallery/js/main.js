gsap.registerPlugin(ScrollTrigger);

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

// function init(){
    
//     // start here
//     initHoverReveal();

// }

// window.addEventListener('load', function(){
//     init();
// });

// MOBILE
// define breakpoint
const mq = window.matchMedia("(min-width: 768px)");

// add change listener on to this breakpoint
mq.addListener(handleWidthChange);


//  first page load
handleWidthChange(mq);

// media query change
function handleWidthChange(mq){
    // console.log(mq);
    // check if we are on the right breakpoint
    if(mq.matches){

        // setup hover animation
        initHoverReveal();

    } else {

        // width is less than 768px
        console.log('we are on mobile');
        
    }

}
