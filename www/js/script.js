ons.platform.select('android');
/*
    ons.ready(function(){
    if(ons.platform.isIPad()){
        console.log(ons.platform.isIPad());
        var test = document.getElementById('inner').innerHTML=

                    "<ons-col "+"class="+"'center'"+ "width="+"'33.33%'"+">"+
                        "<div>"+
                            "<canvas "+"style="+"'width:100%'"+"id="+"'metabolismFit'"+"></canvas>"+                       "<!-- metabolismFit Gauge -->"+
                        "</div>"+
                        "<div>Metabolism fit</div>"+
                        "</div>"+
                    "</ons-col>"+
                    "<ons-col "+"class="+"'center'"+ " width="+"'33.33%'"+" class="+"'center'"+">"+
                        "<div>"+
                            "<canvas "+"style="+"'width:100%'"+" id="+"'heartFit'"+"></canvas>"+                            "<!-- Heart Fit Gauge -->"+
                        "</div>"+
                        "<div>Heart fit</div>"+
                    "</ons-col>"+
                    "<ons-col "+"class="+"'center'"+ " width="+"'33.33%'"+">"+
                        "<div>"+
                            "<canvas "+"style="+"'width:100%'"+" id="+"'motionFit'"+"></canvas>"+                           "<!-- motionFit Gauge -->"+
                        "</div>"+
                        "<div>Motion fit</div>"+
                    "</ons-col>"
        ;
    }
    })
*/
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

var prev = function() {
    var carousel = document.getElementById('carousel');
    carousel.prev();
  };
  
  var next = function() {
    var carousel = document.getElementById('carousel');
    carousel.next();
  };
  
  ons.ready(function() {
    var carousel = document.addEventListener('postchange', function(event) {
      console.log('Changed to ' + event.activeIndex)
    });
  });