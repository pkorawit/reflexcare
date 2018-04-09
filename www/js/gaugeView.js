var presets = window.chartColors;
var utils = Samples.utils;
function lineChart() {
    document.addEventListener('init', function (event) {
        var page = event.target;
        if (page.matches('#gaugeView')) {
            var speedData = {
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
            var chartOptions = {
                legend: {
                    display: false,
                    position: 'top',
                    labels: {
                        boxWidth: 100,
                        fontColor: 'black'
                    }
                }
            };
            var ctxDailay = document.getElementById("lineChartDaily").getContext('2d');
            var lineChart = new Chart(ctxDailay, {
                type: 'line',
                data: speedData,
                options: chartOptions
            });
            var ctxWeek = document.getElementById("lineChartWeek").getContext('2d');
            var lineChart = new Chart(ctxWeek, {
                type: 'line',
                data: speedData,
                options: chartOptions
            });
            var ctxMonth = document.getElementById("lineChartMonth").getContext('2d');
            var lineChart = new Chart(ctxMonth, {
                type: 'line',
                data: speedData,
                options: chartOptions
            });
            var ctxYear = document.getElementById("lineChartYear").getContext('2d');
            var lineChart = new Chart(ctxYear, {
                type: 'line',
                data: speedData,
                options: chartOptions
            });
        }
    })
}

document.addEventListener('init', function (event) {
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
})
