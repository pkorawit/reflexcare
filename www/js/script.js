ons.platform.select('android');

var myChart;
var gauge;
var gauge2;
var gauge3;
function chartBuilder() {
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
                    label: function (tooltipItem) {
                        return tooltipItem.yLabel;
                    }
                }
            }
        }
    });
}

function gaugeBuilder() {
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
        percentColors: [[0.0, "#ff0000"], [0.30, "#f9c802"], [0.55, "#e3ef04"], [0.65, "#d0e20b"], [1.0, "#0dcc0a"]]
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
        percentColors: [[0.0, "#ff0000"], [0.30, "#f9c802"], [0.55, "#e3ef04"], [0.65, "#d0e20b"], [1.0, "#0dcc0a"]]
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
        percentColors: [[0.0, "#ff0000"], [0.30, "#f9c802"], [0.55, "#e3ef04"], [0.65, "#d0e20b"], [1.0, "#0dcc0a"]]
    };
    var target3 = document.getElementById('motionFit'); // your canvas element
    gauge3 = new Gauge(target3).setOptions(opts3); // create sexy gauge!
    gauge3.maxValue = 5; // set max gauge value
    gauge3.setMinValue(0);  // Prefer setter over gauge.minValue = 0
    gauge3.animationSpeed = 32; // set animation speed (32 is default value)
    gauge3.set(2.1); // set actual value

}

$(document).ready(function () {
    if (document.getElementById("myChart") != null) {
        chartBuilder();
        gaugeBuilder();
    }
});

document.addEventListener('show', function (event) {
    var page = event.target;
    console.log(page)
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
        page.querySelector('#datacare').onclick = function () {
            myNavigator.bringPageTop('views/data.html');
        };
        page.querySelector('#finish').onclick = function () {
            myNavigator.bringPageTop('views/smartReflex.html');
        };
        page.querySelector('#indexPush').onclick = function () {
            myNavigator.bringPageTop('views/smartReflex.html').then(function () {
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
            myNavigator.bringPageTop('views/smartReflex.html').then(function () {
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
            myNavigator.bringPageTop('views/smartReflex.html').then(function () {
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
    } else if (page.id === 'datacare') {
        console.log(page.id);
        page.querySelector('#smartPush').onclick = function () {
            myNavigator.bringPageTop('views/smartCare.html');
        };
        page.querySelector('#finish').onclick = function () {
            myNavigator.bringPageTop('views/smartReflex.html');
        };
        page.querySelector('#personalPush').onclick = function () {
            myNavigator.bringPageTop('views/personal.html');
        };
        page.querySelector('#moreDevicePush').onclick = function () {

        };
        page.querySelector('#indexPush').onclick = function () {
            myNavigator.bringPageTop('views/smartReflex.html').then(function () {
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
    }




});

var prev = function () {
    var carousel = document.getElementById('carousel');
    carousel.prev();
};

var next = function () {
    var carousel = document.getElementById('carousel');
    carousel.next();
};

ons.ready(function () {
    var carousel = document.addEventListener('postchange', function (event) {
        console.log('Changed to ' + event.activeIndex)
    });
});



document.addEventListener('show', function (event) {
    var page = event.target;
    if (page.matches('#personal')) {
        //------------------------ วันที่ ---------------------------
        (function () {
            var elm = document.getElementById('daydropdown'), // get the select
                df = document.createDocumentFragment();
            for (var i = 01; i <= 31; i++) {
                var option = document.createElement('option');
                option.value = i;
                option.appendChild(document.createTextNode(i));
                df.appendChild(option); // append 
            }
            elm.appendChild(df);
        }());

//------------------------ เดือน ------------------------
        var d = new Date();
        var monthArray = new Array();
        monthArray[0] = "มกราคม";
        monthArray[1] = "กุมภาพันธ์";
        monthArray[2] = "มีนาคม";
        monthArray[3] = "เมษายน";
        monthArray[4] = "พฤษภาคม";
        monthArray[5] = "มิถุนายน";
        monthArray[6] = "กรกฎาคม";
        monthArray[7] = "สิงหาคม";
        monthArray[8] = "กันยายน";
        monthArray[9] = "ตุลาคม";
        monthArray[10] = "พฤศจิกายน";
        monthArray[11] = "ธันวาคม";
        for (m = 0; m <= 11; m++) {
            var optn = document.createElement("OPTION");
            optn.text = monthArray[m];
            optn.value = (m + 1);
            document.getElementById('month').options.add(optn);
        }
        //---------------------------------- ปี -------------------------------
        (function () {
            var elm = document.getElementById('yeardropdown'), // get the select
                df = document.createDocumentFragment();
            for (var i = 2450; i <= 2561; i++) {
                var option = document.createElement('option');
                option.value = i;
                option.appendChild(document.createTextNode(i));
                df.appendChild(option); // append 
            }
            elm.appendChild(df);
        }());
        //----------------------------- น้ำหนัก ---------------------------------
        (function () {
            var elm = document.getElementById('weightdropdown'), // get the select
                df = document.createDocumentFragment();
            for (var i = 2; i <= 150; i++) {
                var option = document.createElement('option');
                option.value = i;
                option.appendChild(document.createTextNode(i + " กก."));
                df.appendChild(option); // append 
            }
            elm.appendChild(df);
        }());
        //--------------------------- ส่วนสูง ---------------------------------
        (function () {
            var elm = document.getElementById('heighdropdown'), // get the select
                df = document.createDocumentFragment();
            for (var i = 100; i <= 200; i++) {
                var option = document.createElement('option'); // create the option element
                option.value = i; // set the value property
                option.appendChild(document.createTextNode(i + " ซม."));
                df.appendChild(option); // append
            }
            elm.appendChild(df);
        }());
        //--------------------- รอบเอว -------------------
        (function () {
            var elm = document.getElementById('waistlinedropdown'), // get the select
                df = document.createDocumentFragment();
            for (var i = 20; i <= 80; i++) {
                var option = document.createElement('option');
                option.value = i; // set the value property
                option.appendChild(document.createTextNode(i + " นิ้ว"));
                df.appendChild(option); // append 
            }
            elm.appendChild(df);
        }());

        //------------------------select option only one---------------------
        $(document).ready(function () {
            $('.slectOne').on('change', function () {
                $('.slectOne').not(this).prop('checked', false);
                $('#result').html($(this).data("id"));
                if ($(this).is(":checked"))
                    $('#result').html($(this).data("id"));
                else
                    $('#result').html('Empty...!');
            });
        });
    }


});

