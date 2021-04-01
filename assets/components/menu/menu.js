const $ = require('jquery');
// click on Mobile menu button
$('#nav-button').on('click', (e)=>{
    $(e.currentTarget).hide();
    $('#nav-mobile').animate({
        left: '+=270'
    },400);
});
// click on mobile menu close button
$('#nav-close').on('click', ()=>{
    $('#nav-button').show();
    $('#nav-mobile').animate({
        left: '-=270'
    },400);
});
/*
Function that read menu Links from backend
 */
const menuDesktop = document.querySelectorAll('.nav__desktop__list > li > a');
const menuMobile = document.querySelectorAll('.nav__mobile__list >li > a');
const linksText = ['home', 'link1','link2', 'link3'];

/*
Function Responsible for loading Menu link from variable
 */
function generateLinkText(element, linkText){

    element.innerHTML = linkText.toUpperCase();
}

menuDesktop.forEach((menuItem, key)=>{
    generateLinkText(menuItem, linksText[key]);
});
menuMobile.forEach((menuItem, key)=>{
    generateLinkText(menuItem, linksText[key]);
});
// ------------ Sub nav
// get links to sub menu
const subLinks = document.querySelectorAll('.nav__desktop__list > li > i');
// add listener on each link
let subMenuStatus = false;
subLinks.forEach((subLink, key)=>{

    subLink.addEventListener('click',(e)=>{
        const nextElement = subLink.nextElementSibling;
        if(!subMenuStatus){
            e.target.style.transform = "rotate(0deg)";
            nextElement.animate([
                {transform: 'translateY(380px)'}
            ],{
                duration: 300,
                iterations: 1,
            }).finished.then(() => {
                nextElement.style.transform = 'translateY(380px)';
            });
            subMenuStatus = true;

        }else{
            e.target.style.transform = "rotate(-90deg)";
            nextElement.animate([
                {transform: 'translateY(-380px)'}
            ],{
                duration: 300,
                iterations: 1,
            }).finished.then(() => {
                nextElement.style.transform = 'translateY(-380px)';
            });
            subMenuStatus = false;
        }
    });

});

// sub mobile menu
const subLinksMobile = document.querySelectorAll('.nav__mobile__list >li > i');
let subMenuMobileStatus = false;
subLinksMobile.forEach((subLinkMobile, key)=>{

    subLinkMobile.addEventListener('click',(e)=> {

        const nextSubElement = subLinkMobile.nextElementSibling.nextElementSibling;

        if (!subMenuMobileStatus) {
            e.target.style.transform = "rotate(0deg)";
            nextSubElement.classList.remove('subNav__mobile__hide');
            subMenuMobileStatus = true;

        } else {
            e.target.style.transform = "rotate(-90deg)";
            nextSubElement.classList.add('subNav__mobile__hide');
            subMenuMobileStatus = false;

        }

    });

});
