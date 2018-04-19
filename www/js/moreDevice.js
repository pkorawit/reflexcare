ons.ready(function () {
    document.addEventListener('init', function (event) {
        var page = event.target;
        var currentUser = page.data.currentUser;
        if (page.id == "moreDevice") {
            
            //Control add icons
            for(var i=0;i<currentUser.devices.length;i++){
                var device = "#" + currentUser.devices[i];
                $(device).attr("src","img/yes.png");
            }

            function addFitbit(device){

                if(currentUser.devices.indexOf(device) != -1){
                    return;
                }

                console.log(device);
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
                            currentUser.devices.push(device);
                            if (score == null) {
                                //Get mock score template
                                var mockUserID = "mock@smartreflex.info";
                                SmartReflex.getScore(mockUserID).then(function (message, mockscore) {  
                                    mockscore.userid = currentUser.profile.userid;
                                    SmartReflex.addScore(mockscore).then(function (message, newscore) {                                       
                                        SmartReflex.updateUser(currentUser).then(function (message, newuser) {
                                            changeTab('views/smartReflex.html', 'SMART REFLEX', 1);
                                        });                                        
                                    });
                                });
                            }
                            else{
                                changeTab('views/smartReflex.html', 'SMART REFLEX', 1);
                            }
                        });
                    }
                });
            }

            $('#charge2').click(function () {
                addFitbit('charge2')
            });

            $('#aria2').click(function () {
                addFitbit('aria2')
            });

        }
    });
});
