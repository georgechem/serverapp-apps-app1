const $ = require('jquery');
$('#nav-mobile').hide();
$('#nav-button').on('click', (e)=>{
    $(e.currentTarget).hide();
    $('#nav-mobile').slideToggle();
});
$('#nav-close').on('click', ()=>{
    $('#nav-mobile').fadeToggle();
    $('#nav-button').show();
});
