ons.platform.select('android');
var data = {
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
var presets = window.chartColors;
var utils = Samples.utils;
var defaultId;
var defaultmetabolism;
var defaultheartRate;
var defaultmotion;   
var myChart;
var gauge;
var id;
var metabolism;
var heartRate;
var motion;
var myNavigator;
var page;

ons.ready(function () {
    myNavigator = document.getElementById('mainNavigator');
    defaultId = 0;
    defaultmetabolism = data.names[0].meta;
    defaultheartRate = data.names[0].heart;
    defaultmotion = data.names[0].motion;
    $.get('views/smartReflex.html', function (templates) {
        var template = $('#template').html();
        Mustache.parse(template);   // optional, speeds up future uses
        for (let index = 1; index < 4; index++) {
            var rendered = Mustache.render(template, data.names[index]);
            $('#target').append(rendered);
        }
        var thumbnailTemplate = $('#thumbnailTamplate').html();
        var img = data.names[defaultId];
        var imgRendered = Mustache.render(thumbnailTemplate, img);
        $('#thumbnailIMG').html(imgRendered);

        var profileTemplate = $('#profileTamplate').html();
        var img = data.names[defaultId];
        var profileRendered = Mustache.render(profileTemplate, img);
        $('#profileTarget').html(profileRendered);
    });
    
    var thumbnailTemplate = $('#thumbnailTamplate').html();
    var img = data.names[defaultId];
    var imgRendered = Mustache.render(thumbnailTemplate, img);
    $('#thumbnailCare').html(imgRendered);

    document.addEventListener('init', function (event) {
        var page = event.target;
        if (page.matches('#smartCare')) {
            $.get('views/smartCare.html', function (templates) {
                var template = $('#familyTemplate').html();
                var recentlyTemplate = $('#recentlyTemplate').html();
                Mustache.parse(template);   // optional, speeds up future uses
                for (let index = 1; index < 4; index++) {
                    var rendered = Mustache.render(template, data.names[index]);
                    var recentlyRendered  = Mustache.render(recentlyTemplate, data.names[index]);
                    $('#family').append(rendered);
                    $('#recentlyTarget').append(recentlyRendered);
                }
                for (let index = 4; index < data.names.length; index++) {
                    var recentlyRendered  = Mustache.render(recentlyTemplate, data.names[index]);
                    $('#recentlyTarget2').append(recentlyRendered);
                }
            });
        }
    })
    
    
    lineChart("lineChartDaily", "lineChartWeek", "lineChartMonth", "lineChartYear");
    chartBuilder("myChart", defaultmetabolism, defaultheartRate, defaultmotion);
    gaugeBuilder("heartFit", defaultheartRate);
    gaugeBuilder("metabolismFit", defaultmetabolism);
    gaugeBuilder("motionFit", defaultmotion);
    myChart.render({
        duration: 1800,
        lazy: false,
        easing: 'easeOutBounce'
    });
        
});
function lineChart(targetDaily, targetWeek, targetMonth, targetYear) {
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
            var ctxDailay = document.getElementById(targetDaily).getContext('2d');
            var ctxWeek = document.getElementById(targetWeek).getContext('2d');
            var ctxMonth = document.getElementById(targetMonth).getContext('2d');
            var ctxYear = document.getElementById(targetYear).getContext('2d');

            var lineChartDaily = new Chart(ctxDailay, {
                type: 'line',
                data: dataDaily,
                options: chartOptions
            });
            var lineChartWeek = new Chart(ctxWeek, {
                type: 'line',
                data: dataWeek,
                options: chartOptions
            });
            var lineChartMonth = new Chart(ctxMonth, {
                type: 'line',
                data: dataMonth,
                options: chartOptions
            });
            var lineChartYear = new Chart(ctxYear, {
                type: 'line',
                data: dataYear,
                options: chartOptions
            });
}


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
                    fontSize: 15,
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
    myChart.update();
}

function gaugeBuilder(renderTarget, value){
    var opts = {
        renderTicks: {
            divisions: 5,
            divWidth: 0,
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
        staticZones: [
            {strokeStyle: "#fa4417", min: 0, max: 1}, // Red from 100 to 130
            {strokeStyle: "#faaa17", min: 1, max: 2}, // Yellow
            {strokeStyle: "#faf617", min: 2, max: 3}, // Green
            {strokeStyle: "#a3fa17", min: 3, max: 4}, // Yellow
            {strokeStyle: "#1ffa17", min: 4, max: 5}  // Red
         ],
          // to see which ones work best for you
        generateGradient: true,
        highDpiSupport: true,     // High resolution support
        
    };
    var target = document.getElementById(renderTarget); // your canvas element
    gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = 5; // set max gauge value
    gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
    gauge.animationSpeed = 128; // set animation speed (32 is default value)
    gauge.set(value); // set actual value
}

function imgPush(id){
            if(page.matches('#smartReflex')){        
            myNavigator.pushPage('views/smartReflexPush.html', {data:{id:id}});
            metabolism = data.names[id].meta;
            heartRate = data.names[id].heart;
            motion = data.names[id].motion;
        }
    
}

document.addEventListener('show', function (event) {
        page = event.target;
    if (page.matches('#smartReflex')) {
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

    }else if (page.matches('#smartReflexPush')) {
        id = page.data.id;
        chartBuilder("myChartPush", metabolism, heartRate, motion);
        gaugeBuilder("heartFitPush", heartRate);
        gaugeBuilder("metabolismFitPush", metabolism);
        gaugeBuilder("motionFitPush", motion);
        
        lineChart("lineChartDailyPush", "lineChartWeekPush", "lineChartMonthPush", "lineChartYearPush");
        

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
        
       
        //------------------------------------------template Render-------------------------------------------------
        var thumbnailTemplate = $('#thumbnailTamplate').html();
        var img = data.names[defaultId];
        var imgRendered = Mustache.render(thumbnailTemplate, img);
        $('#thumbnailPushed').html(imgRendered);

        
        var profileTemplate = $('#profileTamplate').html();
        var img = data.names[id];
        var profileRendered = Mustache.render(profileTemplate, img);
        $('#profilePushed').html(profileRendered);
    }
});
