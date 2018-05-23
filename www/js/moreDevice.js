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

                // if(currentUser.devices.indexOf(device) != -1){
                //     return;
                // }

                console.log(device);
                var endUrl = "https://smartreflex-2018.firebaseapp.com/fitbit";
                var url = "https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=22CVM2&redirect_uri=https%3A%2F%2Fsmartreflex-2018.firebaseapp.com%2Ffitbit&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight";
                var browser = cordova.InAppBrowser.open(url, '_blank', 'location=yes');
                browser.addEventListener('loadstart', function (evt) {
                    console.log('evt.url = ' + evt.url);

                    if (evt.url.indexOf(endUrl) == 0) {
                        // close the browser, we are done!
                        browser.close();
                        var modal = document.querySelector('ons-modal');
                        modal.show();
                        // TODO: pull the token out and 
                        // use it for further API calls.
                        var fitbitCode = evt.url.split('code=')[1];
                        console.log(fitbitCode);

                        SmartReflex.registerFitbitAccount(fitbitCode, currentUser).then(function (message, data) {
                            ons.notification.toast('Fitbit account is registered ', { timeout: 2000 }).then(function (name) {
                                
                            });
                        });

                        //Create mock up score data
                        SmartReflex.getScore(currentUser.profile.userid).then(function (message, score) {
                            console.log(currentUser.profile.userid);
                            console.log(score);
                            SmartReflex.getUser(currentUser.profile.userid).then(function (message, updateUser) {  
                                currentUser = updateUser;
                                updateUser.devices.push(device);
                                if (score == null) {
                                    //Get mock score template
                                    var mockUserID = "mock@smartreflex.info";
                                    SmartReflex.getScore(mockUserID).then(function (message, mockscore) {  
                                        mockscore.userid = currentUser.profile.userid;
                                        mockscore.today.HR = SmartReflex.randomIntFromInterval(70, 85); 
                                        mockscore.today.calories = SmartReflex.randomIntFromInterval(500, 1000); 
                                        mockscore.today.distance = SmartReflex.randomIntFromInterval(2000, 3000); 
                                        mockscore.today.steps = SmartReflex.randomIntFromInterval(6000, 12000); 
                                        SmartReflex.addScore(mockscore).then(function (message, newscore) {                                       
                                            SmartReflex.updateUser(updateUser).then(function (message, newuser) {
                                                modal.hide();
                                                changeTab('views/smartReflex.html', 'SMART REFLEX', 1);
                                            });                                        
                                        });
                                    });
                                }
                                else{                                    
                                    SmartReflex.updateUser(updateUser).then(function (message, newuser) {
                                        modal.hide();
                                        changeTab('views/smartReflex.html', 'SMART REFLEX', 1);
                                    }); 
                                }
                            });
                        });

                        modal.hide();

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
