const $ = require('jquery');
$('#nav-mobile').hide();
$('#nav-button').on('click', (e)=>{
    $(e.currentTarget).hide();
    $('#nav-mobile').slideToggle();
});
$('#nav-close').on('click', ()=>{
    $('#nav-mobile').slideToggle();
    $('#nav-button').show();
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
