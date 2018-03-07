ons.ready(function () {

    $('.listening').css('display','none');
    $('.received').css('display','block');

    console.log('OnsenUI + Cordova is ready');
    setInterval(function(){ 
        console.log('Go to home page');
        window.location.replace('home.html');
    }, 3000);
});