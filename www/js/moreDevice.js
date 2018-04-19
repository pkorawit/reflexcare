
ons.ready(function () {
    document.addEventListener('init', function (event) {
        var page = event.target;
        var currentUser = page.data.currentUser;
        if (page.id == "moreDevice") {
            if (!currentUser.profile.gender) {
                ons.notification.toast('Please fill all the personal infomation', { timeout: 1000 }).then(function (name) {
                    changeTab('views/personal.html', 'PERSONAL INFO', 3);
                });
            } else {
                $('#charge2').click(function () {
                    console.log('Charge2');
                    var endUrl = "https://smartreflex-2018.firebaseapp.com/fitbit";
                    var url = "https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=22CVM2&redirect_uri=https%3A%2F%2Fsmartreflex-2018.firebaseapp.com%2Ffitbit&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight";
                    var browser = cordova.InAppBrowser.open(url, '_blank', 'location=yes');
                    browser.addEventListener('loadstart', function (evt) {
                        console.log('evt.url = ' + evt.url);

                        if (evt.url.indexOf(endUrl) == 0) {
                            // close the browser, we are done!
                            browser.close();
                            // TODO: pull the token out and 
                            // use it for further API calls.
                            var fitbitCode = evt.url.split('code=')[1];
                            //ons.notification.alert(fitbitCode);   

                            //Create mock up score data
                            SmartReflex.getScore(currentUser.profile.userid).then(function (message, score) {
                                console.log(currentUser.profile.userid);
                                console.log(score);
                                if (score == null) {
                                    //Get mock score template
                                    var mockUserID = "mock@smartreflex.info";
                                    SmartReflex.getScore(mockUserID).then(function (message, mockscore) {
                                        //ons.notification.alert(message);   
                                        mockscore.userid = currentUser.profile.userid;
                                        SmartReflex.addScore(mockscore).then(function (message, newscore) {
                                            //ons.notification.alert(message);   
                                            changeTab('views/smartReflex.html', 'SMART REFLEX', 1);
                                        });
                                    });
                                }
                            });
                        }
                    });
                });
            }
        }
    });
});



