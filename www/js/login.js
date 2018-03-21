$(function(){
    $('#signin').click(function(){
        var username = $('#username').val();
        var password = $('#password').val();
        if(username === password){        
            console.log('Go to home page');
            window.location.replace('home.html');
        }
        else{
            ons.notification.alert('Incorrect password');
        }
    })
});