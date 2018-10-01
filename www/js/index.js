ons.ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyC084zG4lwkrp4G-C6sK_smmXo9DBN2I-Q",
        authDomain: "smartreflex-2018.firebaseapp.com",
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            window.location.replace('home.html?userid=' + user.email);
        } else {
            window.location.replace('login.html');
            console.log('Required Login');
        }
    });

    $('.listening').css('display','none');
    $('.received').css('display','block');

});
