ons.platform.select('android');

var myChart;
var gauge;
var gauge2;
var gauge3;

document.addEventListener('click', function(event){
    var id = event.target.id;
    var navigator = document.getElementById('mainNavigator');
    $('ons-card').click(function(){
        navigator.popPage('views/smartReflexPush.html', {data: {id:id}})
        console.log(id)
    })
})

function chartBuilder(){
    var ctx = document.getElementById("myChart").getContext('2d');
    myChart = new Chart(ctx, {
        type: 'radar',
        data: {            //Top          //Right       //Left
            labels: ["Metabolism fit", "Heart fit", "Motion fit"],
            datasets: [{
                      //top,right,left  
                data: [2, 5, 3],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scale: {
                ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 5,
                    stepSize: 1
                },
                pointLabels: {
                    fontColor: "black",
                    fontSize: 15
                }
            },
           
            legend: {
                display: false,
            },
            tooltips: {
                callbacks: {
                   label: function(tooltipItem) {
                          return tooltipItem.yLabel;
                   }
                }
            }
        }
    });
}

function gaugeBuilder(){
    var opts = {
        renderTicks: {
            divisions: 5,
            divWidth: 1.5,
            divLength: 1,
            divColor: '#FFFFFF',
          },
        angle: 0, // The span of the gauge arc
        lineWidth: 0.26, // The line thickness
        radiusScale: 0.7, // Relative radius
        pointer: {
            length: 0.6, // // Relative to gauge radius
            strokeWidth: 0.035, // The thickness
            color: '#000000' // Fill color
        },
        strokeColor: '#cdcdb1',  // to see which ones work best for you
        generateGradient: true,
        highDpiSupport: true,     // High resolution support
        percentColors: [[0.0, "#ff0000" ], [0.30, "#f9c802"],[0.55, "#e3ef04"],[0.65, "#d0e20b"], [1.0, "#0dcc0a"]]
    };
    var target = document.getElementById('heartFit'); // your canvas element
    gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = 5; // set max gauge value
    gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
    gauge.animationSpeed = 128; // set animation speed (32 is default value)
    gauge.set(3.6); // set actual value

    //-----------------------------------------------------------------------------------------------------------------------------------------------
    var opts2 = {
        renderTicks: {
            divisions: 5,
            divWidth: 1.5,
            divLength: 1,
            divColor: '#FFFFFF',
          },
        angle: 0, // The span of the gauge arc
        lineWidth: 0.26, // The line thickness
        radiusScale: 0.7, // Relative radius
        pointer: {
            length: 0.6, // // Relative to gauge radius
            strokeWidth: 0.035, // The thickness
            color: '#000000' // Fill color
        },
        strokeColor: '#cdcdb1',  // to see which ones work best for you
        generateGradient: true,
        highDpiSupport: true,     // High resolution support
        percentColors: [[0.0, "#ff0000" ], [0.30, "#f9c802"],[0.55, "#e3ef04"],[0.65, "#d0e20b"], [1.0, "#0dcc0a"]]
    };
    var target2 = document.getElementById('metabolismFit'); // your canvas element
    gauge2 = new Gauge(target2).setOptions(opts2); // create sexy gauge!
    gauge2.maxValue = 5; // set max gauge value
    gauge2.setMinValue(0);  // Prefer setter over gauge.minValue = 0
    gauge2.animationSpeed = 32; // set animation speed (32 is default value)
    gauge2.set(1.2); // set actual value
    //-------------------------------------------------------------------------------------------------------------------------------------------------------

    var opts3 = {
        renderTicks: {
            divisions: 5,
            divWidth: 1.5,
            divLength: 1,
            divColor: '#FFFFFF',
          },
        angle: 0, // The span of the gauge arc
        lineWidth: 0.26, // The line thickness
        radiusScale: 0.7, // Relative radius
        pointer: {
            length: 0.6, // // Relative to gauge radius
            strokeWidth: 0.035, // The thickness
            color: '#000000' // Fill color
        },
        strokeColor: '#cdcdb1',  // to see which ones work best for you
        generateGradient: true,
        highDpiSupport: true,     // High resolution support
        percentColors: [[0.0, "#ff0000" ], [0.30, "#f9c802"],[0.55, "#e3ef04"],[0.65, "#d0e20b"], [1.0, "#0dcc0a"]]
    };
    var target3 = document.getElementById('motionFit'); // your canvas element
    gauge3 = new Gauge(target3).setOptions(opts3); // create sexy gauge!
    gauge3.maxValue = 5; // set max gauge value
    gauge3.setMinValue(0);  // Prefer setter over gauge.minValue = 0
    gauge3.animationSpeed = 32; // set animation speed (32 is default value)
    gauge3.set(2.1); // set actual value

}

$(document).ready(function(){
   if(document.getElementById("myChart") != null){
       chartBuilder();
       gaugeBuilder();
   }
});

document.addEventListener('init', function (event) {
    var page = event.target;
    var myNavigator = document.getElementById('mainNavigator');
    if (page.matches('#index')) {
        myChart.render({
            duration: 1800,
            lazy: false,
            easing: 'easeOutBounce'
        });
        page.querySelector('#smartPush').onclick = function () {
            myNavigator.bringPageTop('views/smartCare.html');
        };
        page.querySelector('#personalPush').onclick = function () {
            myNavigator.bringPageTop('views/personal.html');
        };
        page.querySelector('#moreDevicePush').onclick = function () {
            myNavigator.bringPageTop('views/moreDevice.html');
        };
        page.querySelector('#indexPush').onclick = function () {

        };
    } else if (page.id === 'personal') {
        console.log(page.id);
        page.querySelector('#smartPush').onclick = function () {
            myNavigator.bringPageTop('views/smartCare.html');
        };
        page.querySelector('#personalPush').onclick = function () {

        };
        page.querySelector('#moreDevicePush').onclick = function () {
            myNavigator.bringPageTop('views/moreDevice.html');
        };
        page.querySelector('#indexPush').onclick = function () {
            myNavigator.bringPageTop('views/smartReflex.html').then(function(){
                gaugeBuilder();
                myChart.destroy();
                chartBuilder();
                myChart.render({
                    duration: 2100,
                    lazy: false,
                    easing: 'easeOutBounce'
                });
            });
        ;
        };
    } else if (page.id === 'moreDevice') {
        console.log(page.id);
        page.querySelector('#smartPush').onclick = function () {
            myNavigator.bringPageTop('views/smartCare.html');
        };
        page.querySelector('#personalPush').onclick = function () {
            myNavigator.bringPageTop('views/personal.html');
        };
        page.querySelector('#moreDevicePush').onclick = function () {

        };
        page.querySelector('#indexPush').onclick = function () {
            myNavigator.bringPageTop('views/smartReflex.html').then(function(){
                gaugeBuilder();
                myChart.destroy();
                chartBuilder();
                myChart.render({
                    duration: 2100,
                    lazy: false,
                    easing: 'easeOutBounce'
                });
            });
        };
    } else if (page.matches('#smartCare')) {
        console.log(page.id);
        page.querySelector('#smartPush').onclick = function () {

        };
        page.querySelector('#personalPush').onclick = function () {
            myNavigator.bringPageTop('views/personal.html');
        };
        page.querySelector('#moreDevicePush').onclick = function () {
            myNavigator.bringPageTop('views/moreDevice.html');
        };
        page.querySelector('#indexPush').onclick = function () {
            myNavigator.bringPageTop('views/smartReflex.html').then(function(){
                gaugeBuilder();
                myChart.destroy();
                chartBuilder();
                myChart.render({
                    duration: 2100,
                    lazy: false,
                    easing: 'easeOutBounce'
                });
            });
        };
    }else if(page.matches('#gaugeView')){
        gaugeBuilder();
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
  
