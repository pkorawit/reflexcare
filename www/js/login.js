ons.ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyC084zG4lwkrp4G-C6sK_smmXo9DBN2I-Q",
        authDomain: "smartreflex-2018.firebaseapp.com",
    };

    firebase.initializeApp(config);
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    
    var mockUserID = 'waree@smartreflex.info';

    $('#signin').click(function () {

        var username = $('#username').val();
        var password = $('#password').val();
        if (username === password) {
            console.log('Go to home page');
            window.location.replace('home.html?userid=' + mockUserID);
        } else {
            ons.notification.alert('Incorrect password');
            firebase.auth().signOut().then(function () {
                ons.notification.alert('Signed Out');
            }).catch(function (error) {
                ons.notification.alert(error);
            });
        }
    })

    $('#loginFacebook').click(function () {
        firebase.auth().signInWithRedirect(provider).then(function () {
            return firebase.auth().getRedirectResult();
        }).then(function (result) {
            // This gives you a Google Access Token.
            // You can use it to access the Google API.
            var token = result.credential.accessToken;
            console.log(token);
            // The signed-in user info.
            var user = result.user;
            console.log(user.email);
            //ons.notification.alert(user.email);
            ons.notification.toast('Welcome, ' + user.displayName,{ timeout: 2000 }).then(function(name){
                window.location.replace('home.html?userid=' + mockUserID);
            });            
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    })
});