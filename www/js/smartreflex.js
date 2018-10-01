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

        //Get activity (steps, calories)
        var activitySummaryRequestURL = "https://api.fitbit.com/1/user/-/activities/date/today.json";

        var activitySummary = await fetch(activitySummaryRequestURL, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + user.datasources[0].accesstoken
            }
        });
        console.log('activitySummary');
        var activityData = await activitySummary.json();
        console.log(activityData.summary.caloriesOut);
        console.log(activityData.summary.steps);

        //Get heartrate
        var yesterday = moment().add(-1, 'days').format("YYYY-MM-DD");       
        var heartRateRequestURL = `https://api.fitbit.com/1/user/-/activities/heart/date/${yesterday}/1d.json`;
        var heartRate = await fetch(heartRateRequestURL, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + user.datasources[0].accesstoken
            }
        });
        console.log('heartRate');
        var heartRateData = await heartRate.json();
        console.log(heartRateData['activities-heart'][0].value.restingHeartRate);

        //Update reflex score
        var parent = this;        
        this.getScore(user.profile.userid).then(function(message, score){
            score.userid = user.profile.userid;
            score.today.calories = activityData.summary.caloriesOut;
            score.today.steps = activityData.summary.steps;
            score.today.distance = activityData.summary.distances[0].distance;
            score.today.HR = heartRateData['activities-heart'][0].value.restingHeartRate;          

            parent.updateScore(score).then(function(message){
                console.log(message);
                //Return promise
                deferred.resolve(message);
                console.log('Finished syncing fitbit ... ' + user.profile.userid);               
            });
        });

        
        return deferred.promise();
    },

};