ons.ready(function () {
console.log("ready")
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
    var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
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
    var gauge2 = new Gauge(target2).setOptions(opts2); // create sexy gauge!
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
    var gauge3 = new Gauge(target3).setOptions(opts3); // create sexy gauge!
    gauge3.maxValue = 5; // set max gauge value
    gauge3.setMinValue(0);  // Prefer setter over gauge.minValue = 0
    gauge3.animationSpeed = 32; // set animation speed (32 is default value)
    gauge3.set(2.1); // set actual value

});