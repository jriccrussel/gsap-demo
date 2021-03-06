gsap.registerPlugin(ScrollTrigger);

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

function init(){
    
    // start here
    initPortfolioHover();

}

window.addEventListener('load', function(){
    init();
});
