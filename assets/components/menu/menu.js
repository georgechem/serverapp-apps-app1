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
