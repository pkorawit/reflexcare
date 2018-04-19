var userData;

document.addEventListener('init', function (event) {
    var page = event.target;
    var currentUser = page.data.currentUser;
    if (page.id == "personal") {
        document.querySelector('ons-back-button').hide();
        console.log(currentUser.profile.userid);
        
        initUI();

        SmartReflex.getUser(currentUser.profile.userid).then(function (messages, dataUser) {
            var gender = document.getElementsByName("gender");
            if (dataUser.profile.gender == "M") {
                gender[1].checked = true;
            }
            else if (dataUser.profile.gender == "F") {
                gender[2].checked = true;
            }

            // var date = new Date(dataUser.health.clinical[0].timestamp);
            var date = new Date(dataUser.profile.DOB);
            document.getElementById("dob").value = date.getFullYear() +
                "-" + ((date.getMonth() + 1) < 10 ? '0' : '') + ((date.getMonth() + 1)) +
                "-" + (date.getDate() < 10 ? '0' : '') + date.getDate();



        })



        SmartReflex.getUser(currentUser.profile.userid).then(function (messages, user) {

            userData = user;

            console.log(user);
            $('#fname').val(user.profile.firstname);
            $('#lname').val(user.profile.lastname);
            $('#height').val(user.health.general.height);
            $('#weight').val(user.health.general.weight);
            $('#waist').val(user.health.general.waist);
        })
    }
})

function updateUserData() {
    userData.profile.firstname = $('#fname').val();
    userData.profile.lastname = $('#lname').val();
    userData.profile.height = $('#height').val();
    userData.profile.weight = $('#weight').val();
    userData.profile.waist = $('#waist').val();
    userData.profile.DOB = $('#dob').val();
    userData.health.clinical[0].timestamp = $('#timestamp').val();
    var gender = document.getElementsByName("gender");
    if (gender[1].checked) {
        userData.profile.gender = gender[1].value
    }
    else {
        userData.profile.gender = gender[2].value
    }



        SmartReflex.updateUser(userData).then(function (messages) {
            console.log(messages);
            changeTab('views/smartReflex.html')
        });
    }

    function initUI() {

        var elm = document.getElementById('weightdropdown'), // get the select
            df = document.createDocumentFragment();
        for (var i = 2; i <= 150; i++) {
            var option = document.createElement('option');
            option.value = i;
            option.appendChild(document.createTextNode(i));
            df.appendChild(option); // append 
        }
        elm.appendChild(df);

        var elm = document.getElementById('heighdropdown'), // get the select
            df = document.createDocumentFragment();
        for (var i = 100; i <= 200; i++) {
            var option = document.createElement('option'); // create the option element
            option.value = i; // set the value property
            option.appendChild(document.createTextNode(i));
            df.appendChild(option); // append
        }
        elm.appendChild(df);

        var elm = document.getElementById('waistlinedropdown'), // get the select
            df = document.createDocumentFragment();
        for (var i = 20; i <= 80; i++) {
            var option = document.createElement('option');
            option.value = i; // set the value property
            option.appendChild(document.createTextNode(i));
            df.appendChild(option); // append 
        }
        elm.appendChild(df);


    }

function cam() {
    var storage = firebase.storage();
    var storageRef = firebase.storage().ref();
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
    });
    function onSuccess(imageURI) {
        var base64str = imageURI;
        var binary = atob(base64str.replace(/\s/g, ''));
        var len = binary.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }
        var blob = new Blob([view], { type: "image/jpeg" });
        var userID = "";// UserID
        var photoRef = storageRef.child("photos/" + userID + ".png");
        photoRef.put(blob).then(function (snapshot) {
            photoRef.getDownloadURL().then(function (url) {
                photoUrl = url;
                $("#preview").attr("src", url);
            })
        });
    }
    function onFail(message) {
        ons.notification.alert('Failed because: ' + message);

    }

}
