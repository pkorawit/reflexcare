document.addEventListener('init', function (event) {
    var page = event.target;
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
        $('#dailybtn').click(function () {
            document.getElementById('lineChartCarousel').setActiveIndex(0);
            $('#dailybtn').addClass("gaugeViewButtonSelected");
            $('#weekbtn').removeClass("gaugeViewButtonSelected");
            $('#monthbtn').removeClass("gaugeViewButtonSelected");
            $('#yearbtn').removeClass("gaugeViewButtonSelected");

        })
        $('#weekbtn').click(function () {
            document.getElementById('lineChartCarousel').setActiveIndex(1);
            $('#dailybtn').removeClass("gaugeViewButtonSelected");
            $('#weekbtn').addClass("gaugeViewButtonSelected");
            $('#monthbtn').removeClass("gaugeViewButtonSelected");
            $('#yearbtn').removeClass("gaugeViewButtonSelected");

        })
        $('#monthbtn').click(function () {
            document.getElementById('lineChartCarousel').setActiveIndex(2);
            $('#dailybtn').removeClass("gaugeViewButtonSelected");
            $('#weekbtn').removeClass("gaugeViewButtonSelected");
            $('#monthbtn').addClass("gaugeViewButtonSelected");
            $('#yearbtn').removeClass("gaugeViewButtonSelected");

        })
        $('#yearbtn').click(function () {
            document.getElementById('lineChartCarousel').setActiveIndex(3);
            $('#dailybtn').removeClass("gaugeViewButtonSelected");
            $('#weekbtn').removeClass("gaugeViewButtonSelected");
            $('#monthbtn').removeClass("gaugeViewButtonSelected");
            $('#yearbtn').addClass("gaugeViewButtonSelected");

        })
    
    if (page.matches('#smartReflex')) {
        $('#heartBtn').addClass("gaugeViewButtonSelected");
    }
        $('#heartBtn').click(function () {
            document.getElementById('gaugeCarouselReflex').setActiveIndex(0);
            $('#heartBtn').addClass("gaugeViewButtonSelected");
            $('#metaBtn').removeClass("gaugeViewButtonSelected");
            $('#motionBtn').removeClass("gaugeViewButtonSelected");
        })
        $('#metaBtn').click(function () {
            document.getElementById('gaugeCarouselReflex').setActiveIndex(1);
            $('#metaBtn').addClass("gaugeViewButtonSelected");
            $('#motionBtn').removeClass("gaugeViewButtonSelected");
            $('#heartBtn').removeClass("gaugeViewButtonSelected");
        })
        $('#motionBtn').click(function () {
            document.getElementById('gaugeCarouselReflex').setActiveIndex(2);
            $('#motionBtn').addClass("gaugeViewButtonSelected");
            $('#metaBtn').removeClass("gaugeViewButtonSelected");
            $('#heartBtn').removeClass("gaugeViewButtonSelected");
        })
        if (page.matches('#smartReflexPush')) {
            $('#heartBtnPush').addClass("gaugeViewButtonSelected");
        }
            $('#heartBtnPush').click(function () {
                document.getElementById('gaugeCarouselReflexPush').setActiveIndex(0);
                $('#heartBtnPush').addClass("gaugeViewButtonSelected");
                $('#metaBtnPush').removeClass("gaugeViewButtonSelected");
                $('#motionBtnPush').removeClass("gaugeViewButtonSelected");
            })
            $('#metaBtnPush').click(function () {
                document.getElementById('gaugeCarouselReflexPush').setActiveIndex(1);
                $('#metaBtnPush').addClass("gaugeViewButtonSelected");
                $('#motionBtnPush').removeClass("gaugeViewButtonSelected");
                $('#heartBtnPush').removeClass("gaugeViewButtonSelected");
            })
            $('#motionBtnPush').click(function () {
                document.getElementById('gaugeCarouselReflexPush').setActiveIndex(2);
                $('#motionBtnPush').addClass("gaugeViewButtonSelected");
                $('#metaBtnPush').removeClass("gaugeViewButtonSelected");
                $('#heartBtnPush').removeClass("gaugeViewButtonSelected");
            })
    
    
})
