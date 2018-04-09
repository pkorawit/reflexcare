ons.platform.select('android');

var myChart;
var gauge;



data = {
    names: [
        {id:"0" , name: "Luke", img:"https://www.cheme.cornell.edu/engineering2/customcf/iws_news/uploads/alabi__reis.jpg", meta: 3, heart: 2, motion: 4 },
        {id:"1" , name: "Drake", img:"http://www.abc.net.au/news/image/7852476-3x2-940x627.jpg",meta: 1, heart: 1, motion: 1  },
        {id:"2" , name: "Famigo", img:"https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg",meta: 1.9, heart: 2.6, motion: 2.7 },
        {id:"3" , name: "Four", img:"http://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg",meta: 2.3, heart: 3, motion: 4 },
        {id:"4" , name: "Eogi", img:"http://www.imgworlds.com/wp-content/themes/IMG/img/phase3/welcome/trex.png",meta: 3.5, heart: 4.5, motion: 4 },
        {id:"5" , name: "Fluffy", img:"https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg",meta: 4, heart: 4.1, motion: 3.9 },
        {id:"6" , name: "Kuku", img:"https://cdn.pixabay.com/photo/2017/05/13/23/05/img-src-x-2310895_960_720.png",meta: 3.1, heart: 2.1, motion: 2.8 },
    ]
}        
//----------------------------------------------------------------Template Render----------------------------------------------------
ons.ready(function () {
    $.get('views/smartReflex.html', function (templates) {
        var template = $('#template').html();
        Mustache.parse(template);   // optional, speeds up future uses
        for (let index = 0; index < data.names.length; index++) {
            var rendered = Mustache.render(template, data.names[index]);
            $('#target').append(rendered);
        }
        var thumbnailTemplate = $('#thumbnailTamplate').html();
        var img = data.names[0];
        var imgRendered = Mustache.render(thumbnailTemplate, img);
        $('#thumbnailIMG').html(imgRendered);

        var profileTemplate = $('#profileTamplate').html();
        var img = data.names[0];
        var profileRendered = Mustache.render(profileTemplate, img);
        $('#profileTarget').html(profileRendered);
    });
    document.addEventListener('init', function (event) {
        var page = event.target;
        if (page.matches('#smartCare')) {
            $.get('views/smartCare.html', function (templates) {
                var template = $('#familyTemplate').html();
                Mustache.parse(template);   // optional, speeds up future uses
                for (let index = 0; index < data.names.length; index++) {
                    var rendered = Mustache.render(template, data.names[index]);
                    $('#family').append(rendered);
                }
            });
        }
    })
});
//----------------------------------------------------------------smartReflex + smartCare---------------------------------------------



function chartBuilder(renderTarget, metabolismRate, heartRate, motionRate){
    var ctx = document.getElementById(renderTarget).getContext('2d');
    myChart = new Chart(ctx, {
        type: 'radar',
        data: {            //Top          //Right       //Left
            labels: ["Metabolism fit", "Heart fit", "Motion fit"],
            datasets: [{
                      //top,right,left  
                data: [metabolismRate, heartRate, motionRate],
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

function gaugeBuilder(renderTarget, value){
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
    var target = document.getElementById(renderTarget); // your canvas element
    gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = 5; // set max gauge value
    gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
    gauge.animationSpeed = 128; // set animation speed (32 is default value)
    gauge.set(value); // set actual value
}

$(document).ready(function(){
   if(document.getElementById("myChart") != null){
       chartBuilder("myChart", 2, 3, 4);
       gaugeBuilder("heartFit", 2.8);
       gaugeBuilder("metabolismFit", 1.4);
       gaugeBuilder("motionFit", 3.5);
   }
});

document.addEventListener('init', function (event) {
    var page = event.target;
    var myNavigator = document.getElementById('mainNavigator');
    if (page.matches('#index')) {
        console.log(page.id);
        myChart.render({
            duration: 1800,
            lazy: false,
            easing: 'easeOutBounce'
        });
        chartBuilder("myChart", data.names[0].meta, data.names[0].heart, data.names[0].motion);
        gaugeBuilder("heartFit", data.names[0].heart);
        gaugeBuilder("metabolismFit", data.names[0].meta);
        gaugeBuilder("motionFit", data.names[0].motion);
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
        //-------------------------------------------------------------ClickEvent---------------------------------------------
        document.addEventListener('click', function(event){
            var id = event.target.id;
            var navigator = document.getElementById('mainNavigator');
            $('ons-card').click(function(){
                navigator.pushPage('views/smartReflexPush.html', {data: {id:id}})
            })
        })

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
            myNavigator.bringPageTop('views/smartReflex.html')
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
            myNavigator.bringPageTop('views/smartReflex.html')
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
            myNavigator.bringPageTop('views/smartReflex.html')
        };

        //  ----------------------------------------        template render----------------------------------------------
        var thumbnailTemplate = $('#thumbnailTamplate').html();
        var img = data.names[0];
        var imgRendered = Mustache.render(thumbnailTemplate, img);
        $('#thumbnailCare').html(imgRendered);

    }else if(page.matches('#gaugeView')){
        var id = page.data.id;
        console.log(document.getElementById('heartFitView'));
        if(document.getElementById('heartFitView') != null){
        gaugeBuilder("heartFitView", data.names[id].heart);
        gaugeBuilder("metabolismFitView", data.names[id].meta);
        gaugeBuilder("motionFitView", data.names[id].motion);
        }
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
            myNavigator.bringPageTop('views/smartReflex.html')
        };
        //  -----------------------------------------   click event--------------------------
        document.addEventListener('click', function(event){
            
            var navigator = document.getElementById('mainNavigator');
            $('#backGauge').click(function(){
                navigator.resetToPage('views/smartReflexPush.html');
                console.log('reset')
            })
        })

        //    ---------------------------------     template render ---------------------------------------------
        var thumbnailTemplate = $('#thumbnailTamplate').html();
        var img = data.names[0];
        var imgRendered = Mustache.render(thumbnailTemplate, img);
        $('#thumbnailGauge').html(imgRendered);

        
        var profileTemplate = $('#profileTamplate').html();
        var img = data.names[id];
        var profileRendered = Mustache.render(profileTemplate, img);
        $('#profileGauge').html(profileRendered);

    }else if (page.matches('#smartReflex')) {
        var id = page.data.id;
        chartBuilder("myChartPush", data.names[id].meta, data.names[id].heart, data.names[id].motion);
        gaugeBuilder("heartFitPush", data.names[id].heart);
        gaugeBuilder("metabolismFitPush", data.names[id].meta);
        gaugeBuilder("motionFitPush", data.names[id].motion);

        console.log(page.id);
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
            myNavigator.bringPageTop('views/smartReflex.html')
        };
        
        //------------------------------------------ClickEvent--------------------------------------------------------
        
        document.addEventListener('click', function(event){
            
            var navigator = document.getElementById('mainNavigator');
            $('canvas').click(function(){
                navigator.pushPage('views/gaugeView.html', {data: {id:id}})
            })
            $('#backPush').click(function(){
                navigator.resetToPage('views/smartReflex.html');
                console.log('reset')
            })
        })

        //------------------------------------------template Render-------------------------------------------------
        var thumbnailTemplate = $('#thumbnailTamplate').html();
        var img = data.names[0];
        var imgRendered = Mustache.render(thumbnailTemplate, img);
        $('#thumbnailPushed').html(imgRendered);

        
        var profileTemplate = $('#profileTamplate').html();
        var img = data.names[id];
        var profileRendered = Mustache.render(profileTemplate, img);
        $('#profilePushed').html(profileRendered);
    }
});
//-----------------------------------------------------------------guageView-----------------------------------------------------------
var presets = window.chartColors;
var utils = Samples.utils;
function lineChart() {
    document.addEventListener('init', function (event) {
        var page = event.target;
        if (page.matches('#gaugeView')) {
            var dataDaily = {
                labels: ["0s", "10s", "20s", "30s", "40s", "50s", "60s"],
                datasets: [{
                    data: [0, 59, 75, 20, 20, 55, 40, 100],
                    lineTension: 0,
                    fill: 'start',
                    borderColor: 'orange',
                    backgroundColor: utils.transparentize(presets.red),
                    borderColor: presets.red,
                }]
            };
           
            var dataWeek = {
                labels: ["", "Sum", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                datasets: [{
                    data: [0, 50, 75, 59, 45, 65, 68, 55],
                    lineTension: 0,
                    fill: 'start',
                    borderColor: 'orange',
                    backgroundColor: utils.transparentize(presets.red),
                    borderColor: presets.red,
                }]
            };
            
            var dataMonth = {
                labels: ["", "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aus", "Sep", "Oct", "Nov", "Dec"],
                datasets: [{
                    data: [0, 20, 54, 56, 58, 68, 78, 40, 50, 30, 35, 45, 55],
                    lineTension: 0,
                    fill: 'start',
                    borderColor: 'orange',
                    backgroundColor: utils.transparentize(presets.red),
                    borderColor: presets.red,
                }]
            };
            
            var dataYear = {
                labels: ["", "2015", "2016", "2017", "2018", "2019", "2020", "2021"],
                datasets: [{
                    data: [0, 59, 75, 48, 55, 0, 0, 0],
                    lineTension: 0,
                    fill: 'start',
                    borderColor: 'orange',
                    backgroundColor: utils.transparentize(presets.red),
                    borderColor: presets.red,
                }]
            };
            var chartOptions = {
                legend: {
                    display: false,
                }
            };
            var ctxDailay = document.getElementById("lineChartDaily").getContext('2d');
            var lineChart = new Chart(ctxDailay, {
                type: 'line',
                data: dataDaily,
                options: chartOptions
            });
            var ctxWeek = document.getElementById("lineChartWeek").getContext('2d');
            var lineChart = new Chart(ctxWeek, {
                type: 'line',
                data: dataWeek,
                options: chartOptions
            });
            var ctxMonth = document.getElementById("lineChartMonth").getContext('2d');
            var lineChart = new Chart(ctxMonth, {
                type: 'line',
                data: dataMonth,
                options: chartOptions
            });
            var ctxYear = document.getElementById("lineChartYear").getContext('2d');
            var lineChart = new Chart(ctxYear, {
                type: 'line',
                data: dataYear,
                options: chartOptions
            });
        }
    })
}

document.addEventListener('show', function (event) {
    var page = event.target;
    $('#heartbtn').click(function () {
        document.getElementById('gaugeCarousel').setActiveIndex(0);
        $('#heartbtn').addClass("gaugeViewButtonSelected");
        $('#metabtn').removeClass("gaugeViewButtonSelected");
        $('#motionbtn').removeClass("gaugeViewButtonSelected");
    })
    $('#metabtn').click(function () {
        document.getElementById('gaugeCarousel').setActiveIndex(1);
        $('#metabtn').addClass("gaugeViewButtonSelected");
        $('#motionbtn').removeClass("gaugeViewButtonSelected");
        $('#heartbtn').removeClass("gaugeViewButtonSelected");
    })
    $('#motionbtn').click(function () {
        document.getElementById('gaugeCarousel').setActiveIndex(2);
        $('#motionbtn').addClass("gaugeViewButtonSelected");
        $('#metabtn').removeClass("gaugeViewButtonSelected");
        $('#heartbtn').removeClass("gaugeViewButtonSelected");
    })
    if (page.matches('#gaugeView')) {
        $('#heartbtn').addClass("gaugeViewButtonSelected");
        $('#dailybtn').addClass("gaugeViewButtonSelected")
    }
    $('#dailybtn').click(function(){
        document.getElementById('lineChartCarousel').setActiveIndex(0);
        $('#dailybtn').addClass("gaugeViewButtonSelected");
        $('#weekbtn').removeClass("gaugeViewButtonSelected");
        $('#monthbtn').removeClass("gaugeViewButtonSelected");
        $('#yearbtn').removeClass("gaugeViewButtonSelected");
        
    })
    $('#weekbtn').click(function(){
        document.getElementById('lineChartCarousel').setActiveIndex(1);
        $('#dailybtn').removeClass("gaugeViewButtonSelected");
        $('#weekbtn').addClass("gaugeViewButtonSelected");
        $('#monthbtn').removeClass("gaugeViewButtonSelected");
        $('#yearbtn').removeClass("gaugeViewButtonSelected");
        
    })
    $('#monthbtn').click(function(){
        document.getElementById('lineChartCarousel').setActiveIndex(2);
        $('#dailybtn').removeClass("gaugeViewButtonSelected");
        $('#weekbtn').removeClass("gaugeViewButtonSelected");
        $('#monthbtn').addClass("gaugeViewButtonSelected");
        $('#yearbtn').removeClass("gaugeViewButtonSelected");
        
    })
    $('#yearbtn').click(function(){
        document.getElementById('lineChartCarousel').setActiveIndex(3);
        $('#dailybtn').removeClass("gaugeViewButtonSelected");
        $('#weekbtn').removeClass("gaugeViewButtonSelected");
        $('#monthbtn').removeClass("gaugeViewButtonSelected");
        $('#yearbtn').addClass("gaugeViewButtonSelected");
        
    })
    
})
ons.ready(function () {         
    lineChart();
    gaugeBuilder("heartFitView", data.names[id].heart);
    gaugeBuilder("metabolismFitView", data.names[id].meta);
    gaugeBuilder("motionFitView", data.names[id].motion);
})
