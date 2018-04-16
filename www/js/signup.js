ons.ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyC084zG4lwkrp4G-C6sK_smmXo9DBN2I-Q",
        authDomain: "smartreflex-2018.firebaseapp.com",
    };

    firebase.initializeApp(config);

    var mockUserID = 'waree@smartreflex.info';

    $('#signup').click(function () {
        var username = $('#username').val();
        var password = $('#password').val();
        firebase.auth().createUserWithEmailAndPassword(username, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            ons.notification.toast(error.message, { timeout: 2000 }).then(function (name) {
            });
        });
    });

    $('#backsignin').click(function () {
        window.location.replace('login.html');
    });


    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            window.location.replace('home.html?userid=' + mockUserID);
        }
    });

});