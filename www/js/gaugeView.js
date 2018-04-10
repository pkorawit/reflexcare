document.addEventListener('init', function (event) {
    var page = event.target;
    
        $('#heartBtnPush').addClass("gaugeViewButtonSelected");
        $('#dailybtnPush').addClass("gaugeViewButtonSelected");
    
        $('#heartBtnPush').click(function () {
            document.getElementById('gaugeCarouselReflexPush').setActiveIndex(0);
            $('#heartBtnPush').addClass("gaugeViewButtonSelected");
            $('#metabtn').removeClass("gaugeViewButtonSelected");
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
        $('#dailybtnPush').click(function () {
            document.getElementById('lineChartCarouselPush').setActiveIndex(0);
            $('#dailybtnPush').addClass("gaugeViewButtonSelected");
            $('#weekbtnPush').removeClass("gaugeViewButtonSelected");
            $('#monthbtnPush').removeClass("gaugeViewButtonSelected");
            $('#yearbtnPush').removeClass("gaugeViewButtonSelected");

        })
        $('#weekbtnPush').click(function () {
            document.getElementById('lineChartCarouselPush').setActiveIndex(1);
            $('#dailybtnPush').removeClass("gaugeViewButtonSelected");
            $('#weekbtnPush').addClass("gaugeViewButtonSelected");
            $('#monthbtnPush').removeClass("gaugeViewButtonSelected");
            $('#yearbtnPush').removeClass("gaugeViewButtonSelected");

        })
        $('#monthbtnPush').click(function () {
            document.getElementById('lineChartCarouselPush').setActiveIndex(2);
            $('#dailybtnPush').removeClass("gaugeViewButtonSelected");
            $('#weekbtnPush').removeClass("gaugeViewButtonSelected");
            $('#monthbtnPush').addClass("gaugeViewButtonSelected");
            $('#yearbtnPush').removeClass("gaugeViewButtonSelected");

        })
        $('#yearbtnPush').click(function () {
            document.getElementById('lineChartCarouselPush').setActiveIndex(3);
            $('#dailybtnPush').removeClass("gaugeViewButtonSelected");
            $('#weekbtnPush').removeClass("gaugeViewButtonSelected");
            $('#monthbtnPush').removeClass("gaugeViewButtonSelected");
            $('#yearbtnPush').addClass("gaugeViewButtonSelected");

        })
        
    
    




    //---------------------------------------*************smartReflex*************-----------------------*--------





        
            $('#heartBtn').addClass("gaugeViewButtonSelected");
            $('#dailybtn').addClass("gaugeViewButtonSelected");            
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
                $('#dailybtnP').removeClass("gaugeViewButtonSelected");
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
    
    
})
