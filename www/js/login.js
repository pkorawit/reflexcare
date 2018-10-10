ons.ready(function () {

    var provider = new firebase.auth.FacebookAuthProvider();
    //provider.addScope('user_birthday');

    var mockUserID = 'waree@smartreflex.info';

    $('#signin').click(function () {
        var username = $('#username').val();
        var password = $('#password').val();
        firebase.auth().signInWithEmailAndPassword(username, password).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            ons.notification.toast(error.message, { timeout: 2000 }).then(function (name) {

            });
        }).then((checkVerify) => {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user.emailVerified) {
                    console.log(user.emailVerified)
                    if (user) {
                        SmartReflex.getUser(user.email).then(function (message, newuser) {
                            //New user
                            if (newuser == null) {
                                ons.notification.toast('Welcome new user, ' + user.email, { timeout: 3000 }).then(function (name) {
    
                                    //Get mockup data 
                                    var mockUserID = "mock@smartreflex.info";
                                    SmartReflex.getUser(mockUserID).then(function (message, mock) {
    
                                        mock.profile.userid = user.email;
    
                                        SmartReflex.addUser(mock).then(function (message, newprofile) {
                                            window.location.replace('home.html?userid=' + user.email);
                                        });
                                    });
                                });
                            }
                            //Existing user
                            else {
                                ons.notification.toast('Welcome, ' + user.displayName, { timeout: 2000 }).then(function (name) {
                                    window.location.replace('home.html?userid=' + user.email);
                                });
                            }
                        });
                    }
                } else {
                    ons.notification.toast("Please verify your email!!", { timeout: 3000 }).then(function (name) {
                       
                    });
                }
            });
        })        
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
            console.log(user.providerData[0].uid);

            SmartReflex.getUser(user.email).then(function (message, newuser) {
                //New user
                if (newuser == null) {
                    ons.notification.toast('Welcome new user, ' + user.email, { timeout: 3000 }).then(function (name) {

                        //Get mockup data 
                        var mockUserID = "mock@smartreflex.info";
                        SmartReflex.getUser(mockUserID).then(function (message, mock) {

                            mock.profile.userid = user.email;
                            mock.profile.firstname = user.displayName.split(' ')[0];
                            mock.profile.lastname = user.displayName.split(' ')[1];
                            mock.profile.photo = user.photoURL + '?type=large&width=720&height=720';

                            SmartReflex.addUser(mock).then(function (message, newprofile) {
                                window.location.replace('home.html?userid=' + user.email);
                            });
                        });
                    });
                }
                //Existing user
                else {
                    ons.notification.toast('Welcome, ' + user.displayName, { timeout: 2000 }).then(function (name) {
                        window.location.replace('home.html?userid=' + user.email);                                   
                    });
                }
            });


        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    })

    $('#signup').click(function () {
        window.location.replace('signup.html');
    })
});