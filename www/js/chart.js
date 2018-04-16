
var ChartBuilder = {
    lineChartDaily: null,
    lineChartWeek: null,
    lineChartMonth: null,
    lineChartYear: null,
    createRadarchart: function (renderTarget, metabolismRate, heartRate, motionRate, alert) {
        var rgba = "";
        if (alert) {
            rgba = "rgba(255, 0, 0, 0.6)";
        } else {
            rgba = "rgba(75, 192, 192, 0.2)";
        }
        var ctx = document.getElementById(renderTarget).getContext('2d');
        myChart = new Chart(ctx, {
            type: 'radar',
            data: {            //Top          //Right       //Left
                labels: ["Heart fit", "Motion fit", "Metabolism fit"],
                datasets: [{
                    //top,right,left  
                    data: [heartRate, motionRate, metabolismRate],
                    backgroundColor: [
                        rgba
                    ],
                    borderColor: [
                        rgba
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
                        fontSize: 13,
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
        myChart.update();
    },
    createConnectionRadarchart: function (renderTarget, metabolismRate, heartRate, motionRate, alert) {
        var rgba = "";
        if (alert) {
            rgba = "rgba(255, 0, 0, 0.6)";
        } else {
            rgba = "rgba(75, 192, 192, 0.2)";
        }
        var ctx = document.getElementById(renderTarget).getContext('2d');
        myChart = new Chart(ctx, {
            type: 'radar',
            data: {            //Top          //Right       //Left
                labels: ["", "", ""],
                datasets: [{
                    //top,right,left  
                    data: [metabolismRate, heartRate, motionRate],
                    backgroundColor: [
                        rgba
                    ],
                    borderColor: [
                        rgba
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
                        stepSize: 1,
                        fontSize: 8
                    },
                    pointLabels: {
                        fontColor: "black",
                        fontSize: 5,
                    },
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
        myChart.update();
    },
    gaugebuilder: function(renderTarget, value){
        var opts = {
            renderTicks: {
                divisions: 4,
                divWidth: 0.1,
                divLength: 0.1,
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
                {strokeStyle: "#e53d3d", min: 1, max: 1.8}, // Red from 100 to 130
                {strokeStyle: "#e6cb00", min: 1.8, max: 2.6}, // Yellow
                {strokeStyle: "#47e105", min: 2.6, max: 3.4}, // Green
                {strokeStyle: "#05d6e1", min: 3.4, max: 4.2}, // Yellow
                {strokeStyle: "#0981dc", min: 4.2, max: 5}  // Red
             ],
              // to see which ones work best for you
            generateGradient: true,
            highDpiSupport: true,     // High resolution support
            
        };
        var target = document.getElementById(renderTarget); // your canvas element
        gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
        gauge.maxValue = 5; // set max gauge value
        gauge.setMinValue(1);  // Prefer setter over gauge.minValue = 0
        gauge.animationSpeed = 128; // set animation speed (32 is default value)
        gauge.set(value); // set actual value
    },
    
    linechartBuilder: function(targetDaily, targetWeek, targetMonth, targetYear, data){
        var utils = Samples.utils;
        var presets = window.chartColors;
        var dataDaily = {
            labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            datasets: [{
                data: data.day,
                lineTension: 0,
                fill: 'start',
                borderColor: 'orange',
                backgroundColor: utils.transparentize(presets.red),
                borderColor: presets.red,
            }]
        };
       
        var dataWeek = {
            labels: ["Week1", "Week2", "Week3", "Week4"],
            datasets: [{
                data: data.week,
                lineTension: 0,
                fill: 'start',
                borderColor: 'orange',
                backgroundColor: utils.transparentize(presets.red),
                borderColor: presets.red,
            }]
        };
        
        var dataMonth = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aus", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
                data: data.month,
                lineTension: 0,
                fill: 'start',
                borderColor: 'orange',
                backgroundColor: utils.transparentize(presets.red),
                borderColor: presets.red,
            }]
        };
        
        var dataYear = {
            labels: ["2015", "2016", "2017", "2018", "2019", "2020", "2021"],
            datasets: [{
                data: data.year,
                lineTension: 0,
                fill: 'start',
                borderColor: 'orange',
                backgroundColor: utils.transparentize(presets.red),
                borderColor: presets.red,
            }]
        };
        var chartOptions = {
            scales:{
                yAxes: [{
                    display: true,
                    ticks: {
                        min: 1,
                        max: 5
                    }
                }]
            },
            legend: {
                display: false,
            }
        };
        var ctxDailay = document.getElementById(targetDaily).getContext('2d');
        var ctxWeek = document.getElementById(targetWeek).getContext('2d');
        var ctxMonth = document.getElementById(targetMonth).getContext('2d');
        var ctxYear = document.getElementById(targetYear).getContext('2d');

        ChartBuilder.lineChartDaily = new Chart(ctxDailay, {
            type: 'line',
            data: dataDaily,
            options: chartOptions
        });
        ChartBuilder.lineChartWeek = new Chart(ctxWeek, {
            type: 'line',
            data: dataWeek,
            options: chartOptions
        });
        ChartBuilder.lineChartMonth = new Chart(ctxMonth, {
            type: 'line',
            data: dataMonth,
            options: chartOptions
        });
        ChartBuilder.lineChartYear = new Chart(ctxYear, {
            type: 'line',
            data: dataYear,
            options: chartOptions
        });
    },
    removeData: function(chart){
        chart.data.datasets.forEach((dataset) => {
            dataset.data = [];
        });
        chart.update();
    },
    addData: function(chart,data){
        chart.data.datasets.forEach((dataset) => {
            dataset.data = data
        });
        chart.update();
        console.log(ChartBuilder.lineChartDaily)
    },
    smartreflexPush: function (page, pagename, highlight, userid) {
        $('#pageTitle').html(pagename);
        document.querySelector('ons-navigator').pushPage(page, {
            data: {
                    title: pagename,
                    userid: userid
                }
            });
            for (var tab = 0; tab < 4; tab++) {
                var target = '#tab' + tab;
                if (highlight == tab) {
                    $(target).addClass('transparent-Bottom-Toolbar');
                } else {
                    $(target).removeClass('transparent-Bottom-Toolbar');
                }
            }
        }
    }