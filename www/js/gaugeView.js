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

document.addEventListener('init', function (event) {
    var page = event.target;
    console.log(page.id);
    if (page.matches('#gaugeView')) {
        $('#heartbtn').addClass("gaugeViewButtonSelected");
        $('#dailybtn').addClass("gaugeViewButtonSelected")
    }
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
