ons.ready(function () {

    var ctx = document.getElementById("myChart").getContext('2d');
    console.log(ctx);
    var myChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ["Heart fit", "Motion fit", "Metabolism fit"],
            datasets: [{
                
                data: [2.9, 2.9, 3.9],
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
   
});
