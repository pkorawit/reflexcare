var userData;

document.addEventListener('init', function (event) {
    var page = event.target;
    var currentUser = page.data.currentUser;
    if (page.id == "personal") {
        document.querySelector('ons-back-button').hide();
        console.log(currentUser.profile.userid);

        initUI();

        SmartReflex.getUser(currentUser.profile.userid).then(function (messages, user) {

            userData = user;

            console.log(user);
            $('#fname').val(user.profile.firstname);
            $('#lname').val(user.profile.lastname);
        })
    }
})

function updateUserData() {
    userData.profile.firstname = $('#fname').val();
    userData.profile.lastname = $('#lname').val();
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

