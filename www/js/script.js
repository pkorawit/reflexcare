ons.platform.select('android');


document.addEventListener('init', function (event) {
    var page = event.target;
    var myNavigator = document.getElementById('mainNavigator');

    if (page.id === 'index') {
        console.log(page.id);
        page.querySelector('#smartPush').onclick = function () {
            myNavigator.pushPage('smartCare.html');
        };
        page.querySelector('#personalPush').onclick = function () {
            myNavigator.pushPage('personal.html');
        };
        page.querySelector('#moreDevicePush').onclick = function () {
            myNavigator.pushPage('moreDevice.html');
        };
        page.querySelector('#indexPush').onclick = function () {

        };
    } else if (page.id === 'personal') {
        console.log(page.id);
        page.querySelector('#smartPush').onclick = function () {
            myNavigator.pushPage('smartCare.html');
        };
        page.querySelector('#personalPush').onclick = function () {

        };
        page.querySelector('#moreDevicePush').onclick = function () {
            myNavigator.pushPage('moreDevice.html');
        };
        page.querySelector('#indexPush').onclick = function () {
            myNavigator.pushPage('index.html');
        };
    } else if (page.id === 'moreDevice') {
        console.log(page.id);
        page.querySelector('#smartPush').onclick = function () {
            myNavigator.pushPage('smartCare.html');
        };
        page.querySelector('#personalPush').onclick = function () {
            myNavigator.pushPage('personal.html');
        };
        page.querySelector('#moreDevicePush').onclick = function () {

        };
        page.querySelector('#indexPush').onclick = function () {
            myNavigator.pushPage('index.html');
        };
    } else if (page.id === 'smartCare') {
        console.log(page.id);
        page.querySelector('#smartPush').onclick = function () {

        };
        page.querySelector('#personalPush').onclick = function () {
            myNavigator.pushPage('personal.html');
        };
        page.querySelector('#moreDevicePush').onclick = function () {
            myNavigator.pushPage('moreDevice.html');
        };
        page.querySelector('#indexPush').onclick = function () {
            myNavigator.pushPage('index.html');
        };
    }




});