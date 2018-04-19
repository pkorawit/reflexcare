
ons.ready(function () {
    document.addEventListener('init', function (event) {
        var page = event.target;
        var currentUser = page.data.currentUser;
        if (page.id == "moreDevice") {
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
                        ons.notification.alert(fitbitCode);   
                        ons.notification.toast("Return from Fitbit", { timeout: 3000 }).then(function (name) {

                        });
                    }
                });
                browser.addEventListener('loaderror', function (err) {     
                        ons.notification.alert('loaderror' + err);                   
                        console.log(JSON.stringify(err));
                        ons.notification.toast("Return from Fitbit", { timeout: 3000 }).then(function (name) {

                        });
                        browser.close();
                    
                });                

            });

        }
    });
});



