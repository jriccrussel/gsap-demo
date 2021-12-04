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
        section.mask = section.querySelector('.rg__image--mask');

        // reset the initial position
        // gsap.set(imageBlock, {yPercent: -101});
        // gsap.set(mask, {yPercent: 100});
        gsap.set(section.imageBlock, {yPercent: -101});
        gsap.set(section.mask, {yPercent: 100});

        // add event listeners to each section
        section.addEventListener('mouseenter', createHoverReveal);
        section.addEventListener('mouseleave', createHoverReveal);

    })
}

function createHoverReveal(e){
    // console.log(e);
    // console.log(e.type);
    
    // console.log(e.target);
    const {imageBlock, mask} = e.target;
    // why 'e.target' remember it was pass from 'const sections'(parent) && then we forEach to gain access sulod sa 'sections', basically 'sections' was the target therefore we gain access sa iyang properties which has 'section.imageBlock, section.mask'
    // console.log(imageBlock, mask);

    let tl = gsap.timeline({
        defaults: {
            duration: 0.7,
            ease: 'Power4.out'
        }
    }); 

    if (e.type === 'mouseenter'){
        
        tl.to([mask, imageBlock], {yPercent:0});
        
    } else if (e.type === 'mouseleave'){

        tl.to(mask, {yPercent: 100})
            .to(imageBlock, {yPercent: -101}, 0);

    }

    return tl;
}

function init(){
    
    // start here
    initHoverReveal();

}

window.addEventListener('load', function(){
    init();
});
