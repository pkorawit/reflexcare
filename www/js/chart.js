var ChartBuilder = {
    createRadarchart: function(renderTarget, metabolismRate, heartRate, motionRate, alert){
        var rgba = "";
    if(alert){
        rgba = "rgba(255, 0, 0, 0.6)";
    }else{
        rgba = "rgba(75, 192, 192, 0.2)";
    }
    var ctx = document.getElementById(renderTarget).getContext('2d');
    myChart = new Chart(ctx, {
        type: 'radar',
        data: {            //Top          //Right       //Left
            labels: ["Heart fit",  "Motion fit", "Metabolism fit"],
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
                   label: function(tooltipItem) {
                          return tooltipItem.yLabel;
                   }
                }
            }
        }
    });
    myChart.update();
    },
    createConnectionRadarchart: function(renderTarget, metabolismRate, heartRate, motionRate, alert){
        var rgba = "";
    if(alert){
        rgba = "rgba(255, 0, 0, 0.6)";
    }else{
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
                   label: function(tooltipItem) {
                          return tooltipItem.yLabel;
                   }
                }
            }
        }
    });
    myChart.update();
    }
}