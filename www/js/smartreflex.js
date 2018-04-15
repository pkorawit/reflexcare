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
    saveProfilePhoto: function(file, userid){

        var deferred = new $.Deferred();
        var photoRef = storageRef.child("photos/" + userid);
        
        photoRef.put(file).then(function (snapshot) {
            photoRef.getDownloadURL().then(function (url) {          
                
                var docRef = db.collection("users").doc(userid);
                docRef.update({
                    "profile.photo" : url
                })
                .then(function() {
                    deferred.resolve("Updated", url);
                })
                .catch(function(error) {                    
                    deferred.resolve("Cannot update user data", url);
                });
                
                deferred.resolve(url);
            })
        });

        return deferred.promise();
    }
};