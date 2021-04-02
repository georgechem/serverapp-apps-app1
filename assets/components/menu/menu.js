const $ = require('jquery');
// click on Mobile menu button
$('#nav-button').on('click', (e)=>{
    $(e.currentTarget).hide();
    const mobileMenuToLeft = document.getElementsByClassName('nav__mobile');
    // Slide Right Sub Menu - VISIBLE
    mobileMenuToLeft[0].animate([
            {transform: 'translateX(0px)'}
        ],
        {
            duration:500,
            iterations: 1,
        }).finished.then(() =>{
        mobileMenuToLeft[0].style.transform = 'translateX(0px)';
    })

});
// click on mobile menu close button
$('#nav-close').on('click', ()=>{
    $('#nav-button').show();
    // Slide Left Sub Menu - HIDDEN
    const mobileMenuToLeft = document.getElementsByClassName('nav__mobile');
    mobileMenuToLeft[0].animate([
        {transform: 'translateX(-300px)'}
    ],
        {
            duration:500,
            iterations: 1,
        }).finished.then(() =>{
            mobileMenuToLeft[0].style.transform = 'translateX(-300px)';
    })

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
function expandSubMenu(subLink){

    let animMouseOn = null;
    subLink.addEventListener('mouseenter',(e)=>{
        animMouseOn = e.target.animate([
            {transform: 'rotate(270deg)'},

        ],{
            duration:1500,
            iterations: Infinity
        })

    });

    subLink.addEventListener('mouseleave',(e)=>{
        animMouseOn.cancel();
    });

    subLink.addEventListener('click',(e)=>{
        const currentText = e.currentTarget.style.cssText;
        // hide all submenus
        subLinks.forEach((subLink)=>{
            // all carets to closed position
            subLink.style.transform = 'rotate(-90deg)';
            subLink.nextElementSibling.animate([
                {transform: 'translateY(-380px)'}
            ],{
                duration: 300,
                iterations: 1
            }).finished.then(()=>{
                subLink.nextElementSibling.style.transform = 'translateY(-380px)';
            });
        });
        const textAfter = e.currentTarget.style.cssText;
        if(textAfter === currentText || currentText === ''){
            e.currentTarget.style.transform = 'rotate(0deg)';
            e.target.nextElementSibling.animate([
                {transform: 'translateY(20px'}
            ],{
                duration: 300,
                iterations: 1
            }).finished.then(()=>{
                e.target.nextElementSibling.style.transform = 'translateY(20px)';
            });
        }

    });
}
// get links to sub menu
const subLinks = document.querySelectorAll('.nav__desktop__list > li > i');
const mainLinks = document.querySelectorAll('.nav__desktop > ul > li > a');
mainLinks.forEach((mainLink)=>{
    mainLink.addEventListener('click', (e)=>{
        e.preventDefault();
    })
});
// add listener on each link
subLinks.forEach((subLink)=>{

    expandSubMenu(subLink);



});

// listeners on buttons
const subLinksMobile = document.querySelectorAll('.nav__mobile__list >li > i');
const mainLinksMobile = document.querySelectorAll('.nav__mobile__list > li > a');
const navMobileLinks = document.querySelectorAll('.nav__mobile > ul > li > ul');
subLinksMobile.forEach((subLinkMobile)=>{
    // Main Links in Menu are Rather Headers - Not Clickable
    mainLinksMobile.forEach((mainLinkMobile)=>{
        mainLinkMobile.addEventListener('click',(e)=>{
            e.preventDefault();
        });
    });
    // Get NEXT -> NEXT element
    const nextSubElement = subLinkMobile.nextElementSibling.nextElementSibling;

    subLinkMobile.addEventListener('click',(e)=> {
        // close all submenus and restore carets and set subMenuMobileStatus
        const currentText = e.currentTarget.style.cssText;
        // Close all sub Menus
        navMobileLinks.forEach((subMenu,key)=>{
            // add hide class to every Sub Menu
            subMenu.classList.add('subNav__mobile__hide');
            subLinksMobile[key].style.transform = "rotate(-90deg)";
        });
        const currentTextAfter = e.currentTarget.style.cssText
        // Show only Clicked Category if Clicked First in a Row
        // otherwise Close Sub menu
        if(currentTextAfter === currentText || currentText === ''){
            e.target.style.transform = "rotate(0deg)";
            nextSubElement.classList.remove('subNav__mobile__hide');
            // animate element height
            nextSubElement.animate([
                {maxHeight: '1px'},
                {maxHeight: '500px'}
            ],{
                duration: 400,
                iterations: 1
            }).finished.then(() => {
                nextSubElement.style.maxHeight = '500px';
            });
        }








    });

});
