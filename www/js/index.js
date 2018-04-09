ons.ready(function () {

    $('.listening').css('display','none');
    $('.received').css('display','block');

    console.log('OnsenUI + Cordova is ready');
    setInterval(function(){ 
        console.log('Go to login page');
        window.location.replace('login.html');
    }, 3000);
});
