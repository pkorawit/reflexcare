// Initialize Firebase
var config = {
    apiKey: "AIzaSyC084zG4lwkrp4G-C6sK_smmXo9DBN2I-Q",
    authDomain: "smartreflex-2018.firebaseapp.com",
    databaseURL: "https://smartreflex-2018.firebaseio.com",
    projectId: "smartreflex-2018",
    storageBucket: "smartreflex-2018.appspot.com",
    messagingSenderId: "445800935420"
};

firebase.initializeApp(config);
var db = firebase.firestore();
var storage = firebase.storage();
var storageRef = firebase.storage().ref();

// SmartReflex back-end data retrieval
var SmartReflex = {

    //Get a user by user id
    getUser: function (userid) {
        var deferred = new $.Deferred();
        var docRef = db.collection("users").doc(userid);

        docRef.get().then(function (doc) {
            if (doc.exists) {
                deferred.resolve("Done", doc.data());
            } else {
                deferred.resolve("No such a user: " + userid, null);
            }
        }).catch(function (error) {
            deferred.resolve("Error getting user: " + userid, error);
            return null;
        });

        return deferred.promise();
    },

    //Get fit scores by user id
    getScore: function (userid) {
        var deferred = new $.Deferred();
        var docRef = db.collection("fitscores").doc(userid);

        docRef.get().then(function (doc) {
            if (doc.exists) {
                deferred.resolve("Done", doc.data());
            } else {
                deferred.resolve("No such a user: " + userid, null);
            }
        }).catch(function (error) {
            deferred.resolve("Error getting user: " + userid, error);
            return null;
        });

        return deferred.promise();
    },

    //Get all devices collection
    getAllDevice: function () {
        var deferred = new $.Deferred();
        var devices = [];
        db.collection("devices").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                devices.push(doc.data());
            });
            deferred.resolve(devices);
        });

        return deferred.promise();
    },

    //Save profile photo
    saveProfilePhoto: function (file, userid) {

        var deferred = new $.Deferred();
        var photoRef = storageRef.child("photos/" + userid);

        photoRef.put(file).then(function (snapshot) {
            photoRef.getDownloadURL().then(function (url) {

                var docRef = db.collection("users").doc(userid);
                docRef.update({
                        "profile.photo": url
                    })
                    .then(function () {
                        deferred.resolve("Updated", url);
                    })
                    .catch(function (error) {
                        deferred.resolve("Cannot update user data", url);
                    });
            })
        });

        return deferred.promise();
    },

    //Update User
    updateUser: function (user) {


        var deferred = new $.Deferred();
        var docRef = db.collection("users").doc(user.profile.userid);
        docRef.update(user)

            .then(function () {
                deferred.resolve("Updated");
            })
            .catch(function (error) {
                deferred.resolve("Cannot update profile : " + error);
            });

        return deferred.promise();
    },

    //Save profile photo
    addUser: function (user) {

        var deferred = new $.Deferred();
        var docRef = db.collection("users").doc(user.profile.userid);
        docRef.set(user)

            .then(function () {
                deferred.resolve("Added");
            })
            .catch(function (error) {
                deferred.resolve("Cannot add new profile : " + error);
            });

        return deferred.promise();
    },


    //Add Fit score
    addScore: function (score) {

        var deferred = new $.Deferred();
        var docRef = db.collection("fitscores").doc(score.userid);
        docRef.set(score)

            .then(function () {
                deferred.resolve("Added");
            })
            .catch(function (error) {
                deferred.resolve("Cannot add new fitscores : " + error);
            });

        return deferred.promise();
    },

    //Update Fit Score
    updateScore: function (score) {
        var deferred = new $.Deferred();
        var docRef = db.collection("fitscores").doc(score.userid);
        docRef.update(score)

            .then(function () {
                deferred.resolve("Updated");
            })
            .catch(function (error) {
                deferred.resolve("Cannot update score : " + error);
            });

        return deferred.promise();
    },

    //Add Connention to Firebase
    addConnections: function (score) {

        var deferred = new $.Deferred();
        var docRef = db.collection("users").doc(score.connections);
        docRef.update(score)

            .then(function () {
                deferred.resolve("Added");
            })
            .catch(function (error) {
                deferred.resolve("Cannot add connection : " + error);
            });

        return deferred.promise();
    },


    //Get URL parameter
    getUrlParameter: function (sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    },

    randomIntFromInterval: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    //Sign Out
    signOut: function () {

        var deferred = new $.Deferred();

        firebase.auth().signOut().then(function () {

            //Sign out Fitbit
            var url = "https://www.fitbit.com/logout";
            var browser = cordova.InAppBrowser.open(url, '_blank', 'location=yes');
            browser.addEventListener('loadstart', function (evt) {
                console.log('You have logged out Fitbit successfully.');
                deferred.resolve("Signed Out");
                console.log('signed out');
            });

        }).catch(function (error) {
            deferred.resolve("Cannot sign out");
        });

        return deferred.promise();
    },

    //Register Fitbit 
    registerFitbitAccount: function (code, user) {

        var accessCodeRequestURL = "https://api.fitbit.com/oauth2/token?client_id=22CVM2&grant_type=authorization_code&redirect_uri=https://smartreflex-2018.firebaseapp.com/fitbit";
        accessCodeRequestURL += "&code=" + code;
        authToken = "MjJDVk0yOmM0NjdhZmIwMmRjZWM3ODAzOWQ5NmIyODhhZGExNTU1";

        var deferred = new $.Deferred();

        fetch(accessCodeRequestURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + authToken
                }
            })
            .then(res => res.json())
            .then((data) => {
                // Store Access Token and Refresh Token
                var docRef = db.collection("users").doc(user.profile.userid);
                var ds = {
                    id: "fitbit",
                    accessCode: code,
                    authtoken: authToken,
                    accesstoken: data.access_token,
                    refreshtoken: data.refresh_token
                };
                user.datasources = [];
                user.datasources.push(ds);
                docRef.update(user)
                deferred.resolve("success", data);

            })
            .catch((err) => {
                deferred.resolve("error", err);
            })

        return deferred.promise();
    },

    //Sync with Fitbit Web API 
    syncFitbitAccount: async function (user) {

            console.log('Start sync fitbit ... ' + user.profile.userid);

            var deferred = new $.Deferred();

            var accessToken = user.datasources[0].accesstoken;
            var authToken = user.datasources[0].authtoken;
            var refreshToken = user.datasources[0].refreshtoken;

            var healthData = {
                caloriesOut : 0,
                steps : 0,
                restingHeartRate : 0,
                distance : 0
            }

            //Check for token expire
            var introspecURL = "https://api.fitbit.com/1.1/oauth2/introspect"
            var introspecData = await this.verifyFitbitToken(introspecURL, accessToken);
            console.log('Token status:' + JSON.stringify(introspecData));

            if (introspecData.active == false || introspecData.success == false) {
                var renewData = await this.renewFitbitToken(user, authToken, refreshToken);
                if (renewData.success) {
                    accessToken = renewData.access_token;
                } else {
                    deferred.resolve({
                        success: false,
                        message: 'Failed to refresh access token'
                    });
                    return deferred.promise();
                }
            }          

            // //Get profile     *** Move to Fitbit register       
            var profileRequestURL = "https://api.fitbit.com/1/user/-/profile.json";
            var profileData = await this.getFitbitData(profileRequestURL, accessToken);
            //Update profile
            user.profile.DOB = profileData.user.dateOfBirth
            if(user.profile.gender == 'MALE'){
                user.profile.gender = 'M';
            }
            else{
                user.profile.gender = 'F';
            }            
            user.health.general.height = profileData.user.height
            this.updateUser(user).then(function (message) {
                console.log(message);                
            });

            //Get activity (steps, calories)
            var activitySummaryRequestURL = "https://api.fitbit.com/1/user/-/activities/date/today.json";
            var activityData = await this.getFitbitData(activitySummaryRequestURL, accessToken);
            if(activityData.summary.caloriesOut) healthData.caloriesOut = activityData.summary.caloriesOut;
            if(activityData.summary.steps) healthData.steps = activityData.summary.steps;

            //Get heartrate
            var yesterday = moment().add(-1, 'days').format("YYYY-MM-DD");
            var heartRateRequestURL = `https://api.fitbit.com/1/user/-/activities/heart/date/${yesterday}/1d.json`;
            var heartRateData = await this.getFitbitData(heartRateRequestURL, accessToken);
            if(heartRateData['activities-heart'][0].value.restingHeartRate) healthData.restingHeartRate = heartRateData['activities-heart'][0].value.restingHeartRate;

            console.log(JSON.stringify(healthData));

            //Update reflex score   
            var parent = this;
            this.getScore(user.profile.userid).then(function (message, score) {
                score.userid = user.profile.userid;
                score.today.calories = healthData.caloriesOut;
                score.today.steps = healthData.steps;
                score.today.distance = healthData.distance;
                score.today.HR = healthData.restingHeartRate;

                parent.updateScore(score).then(function (message) {
                    console.log(message);
                    //Return promise
                    deferred.resolve({
                        success: true,
                        message: 'Synced with Fitbit'
                    });
                    console.log('Finished syncing fitbit ... ' + user.profile.userid);
                });
            });

            return deferred.promise();
        },

        getFitbitData: async function (url, token) {

            var deferred = new $.Deferred();
            var response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            var data = await response.json();
            deferred.resolve(data);
            return deferred.promise();

        },

        verifyFitbitToken: async function (url, token) {

                var deferred = new $.Deferred();
                var response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: 'token=' + token
                });
                var data = await response.json();
                deferred.resolve(data);
                return deferred.promise();

            },

        renewFitbitToken: async function (user, authToken, refreshToken) {
            var deferred = new $.Deferred();
            console.log('refreshToken:' + refreshToken);
            var refreshTokenURL = `https://api.fitbit.com/oauth2/token?grant_type=refresh_token&refresh_token=${refreshToken}`
            var response = await fetch(refreshTokenURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + authToken
                }
            });
            var data = await response.json();
            if (data.success == false) {
                deferred.resolve({
                    success: false,
                    renewData: data
                });
            } else {
                console.log('renewFitbitToken:' + JSON.stringify(data));
                // Store Access Token and Refresh Token
                var docRef = db.collection("users").doc(user.profile.userid);
                var ds = user.datasources[0];
                ds.accesstoken = data.access_token,
                    ds.refreshtoken = data.refresh_token
                docRef.update(user).then(function () {
                    deferred.resolve({
                        success: true,
                        renewData: ds
                    });
                    return deferred.promise();
                });
            }
            return deferred.promise();
        }
};