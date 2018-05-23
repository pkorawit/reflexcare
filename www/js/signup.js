ons.ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyC084zG4lwkrp4G-C6sK_smmXo9DBN2I-Q",
        authDomain: "smartreflex-2018.firebaseapp.com",
    };

    firebase.initializeApp(config);

    $('#signup').click(function () {
        var username = $('#username').val();
        var password = $('#password').val();
        firebase.auth().createUserWithEmailAndPassword(username, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            ons.notification.toast(error.message, { timeout: 2000 }).then(function (name) {
            });
        }).then((sendEmailVerify) => {
            if (sendEmailVerify === false) {
                return false
            } else {
                firebase.auth().currentUser.sendEmailVerification();
                ons.notification.toast("Email Verification Sent! Please check your email address.", { timeout: 4000 }).then(function (name) {
                    window.location.replace('login.html');
                });
            }
        })
    });

    $('#backsignin').click(function () {
        window.location.replace('login.html');
    });


    /*firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
           
        }
    });*/
});