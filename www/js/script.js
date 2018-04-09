ons.platform.select('android');
var data; 
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

ons.ready(function () {
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
    defaultId = 0;
    defaultmetabolism = data.names[0].meta;
    defaultheartRate = data.names[0].heart;
    defaultmotion = data.names[0].motion;
    $.get('views/smartReflex.html', function (templates) {
        var template = $('#template').html();
        Mustache.parse(template);   // optional, speeds up future uses
        for (let index = 1; index < data.names.length; index++) {
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
                Mustache.parse(template);   // optional, speeds up future uses
                for (let index = 1; index < 4; index++) {
                    var rendered = Mustache.render(template, data.names[index]);
                    $('#family').append(rendered);
                }
            });
        }
    })
    
    
    
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
    myChart.update();
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

function imgPush(){
    document.addEventListener('click', function(event){
        id = event.target.id;    
        var navigator = document.getElementById('mainNavigator');
        navigator.pushPage('views/smartReflexPush.html', {data:{id:id}});
        metabolism = data.names[id].meta;
        heartRate = data.names[id].heart;
        motion = data.names[id].motion;
    })
}

document.addEventListener('init', function (event) {
    var page = event.target;
    var myNavigator = document.getElementById('mainNavigator');
    if (page.matches('#index')) {
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

    }else if(page.matches('#gaugeView')){
        id = page.data.id;
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
        id = page.data.id;
        chartBuilder("myChartPush", metabolism, heartRate, motion);
        gaugeBuilder("heartFitPush", heartRate);
        gaugeBuilder("metabolismFitPush", metabolism);
        gaugeBuilder("motionFitPush", motion);

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
        
        var navigator = document.getElementById('mainNavigator');
        $('#motionFitPush').click(function () {
            navigator.pushPage('views/gaugeView.html', { data: { id: id } })
            console.log(id)
        })
        $('#heartFitPush').click(function () {
            navigator.pushPage('views/gaugeView.html', { data: { id: id } })
            console.log(id)
        })
        $('#metabolismFitPush').click(function () {
            navigator.pushPage('views/gaugeView.html', { data: { id: id } })
            console.log(id)
        })
            

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