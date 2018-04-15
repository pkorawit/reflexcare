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

    //Save profile photo
    updateUser: function (user, userid) {

        var deferred = new $.Deferred();

        var docRef = db.collection("users").doc(userid);
        docRef.update(user)
            .then(function () {
                deferred.resolve("Updated");
            })
            .catch(function (error) {
                deferred.resolve("Cannot update profile");
            });

        return deferred.promise();
    },

    //Get URL parameter
    getUrlParameter : function getUrlParameter(sParam) {
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
    }
};