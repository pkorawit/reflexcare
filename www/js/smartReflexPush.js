
         document.addEventListener('init', function (event) {
            var page = event.target;
            var userid = page.data.userid;
            console.log(page.id);
            function setTabHighlight(tabNo){
                for (var tab = 1; tab <= 4; tab++) {
                    var target = '#tab' + tab;
                    if (tabNo == tab) {
                        $(target).addClass('transparent-Bottom-Toolbar');
                    } else {
                        $(target).removeClass('transparent-Bottom-Toolbar');
                    }
                }
            }
            if (page.id == "smartReflexPush") {
                //show the back-button
                document.querySelector('ons-back-button').show();
                document.querySelector('ons-back-button').onClick = function (event) {
                    setTabHighlight(2);
                    document.querySelector('ons-navigator').popPage();
                };
                SmartReflex.getScore(userid).then(function (message, user) {
                        var data = {
                            name: currentUser.profile.firstname,
                            img: currentUser.profile.photo,
                            meta: user.today.scores.metabolism,
                            heart: user.today.scores.heart,
                            motion: user.today.scores.motion,
                            step: user.today.steps,
                            cal: user.today.distance,
                            hr: user.today.HR,
                            alert: user.today.alert
                        }
                        //Render profile photo
                        var profileTemplate = $('#profileTamplate').html();
                        var profileRendered = Mustache.render(profileTemplate, data);
                        $('#profileTargetPush').html(profileRendered);
                         //Render today health data, HR, steps, distance
                        var stepTemplate = $('#stepTemplate').html();
                        var callTemplate = $('#calTemplate').html();
                        var hrTemplate = $('#hrTemplate').html();
                        var stepTemplateRendered = Mustache.render(stepTemplate, data);
                        var calTemplateRendered = Mustache.render(callTemplate, data);
                        var hrTemplateRendered = Mustache.render(hrTemplate, data);
                        $('#step').html(stepTemplateRendered);
                        $('#cal').html(calTemplateRendered);
                        $('#hr').html(hrTemplateRendered);
                        ChartBuilder.createRadarchart("myChartPush", data.meta, data.heart, data.motion, alert);
                        ChartBuilder.gaugebuilder("heartFitPush", data.heart);
                        ChartBuilder.gaugebuilder("metabolismFitPush", data.meta);
                        ChartBuilder.gaugebuilder("motionFitPush", data.motion);
                        ChartBuilder.linechartBuilder("lineChartDailyPush", "lineChartWeekPush", "lineChartMonthPush", "lineChartYearPush", user.history.heart);

                        //botton handle
                        $('#heartBtnPush').addClass("gaugeViewButtonSelected");
                        $('#dailybtnPush').addClass("gaugeViewButtonSelected");
                    $('#heartBtnPush').click(function () {
                        document.getElementById('gaugeCarouselReflexPush').setActiveIndex(0);
                        $('#heartBtnPush').addClass("gaugeViewButtonSelected");
                        $('#metabtnPush').removeClass("gaugeViewButtonSelected");
                        $('#motionBtnPush').removeClass("gaugeViewButtonSelected");
                        ChartBuilder.removeData(ChartBuilder.lineChartDaily);
                        ChartBuilder.removeData(ChartBuilder.lineChartWeek);
                        ChartBuilder.removeData(ChartBuilder.lineChartMonth);
                        ChartBuilder.removeData(ChartBuilder.lineChartYear);
                        ChartBuilder.addData(ChartBuilder.lineChartDaily, user.history.heart.day);
                        ChartBuilder.addData(ChartBuilder.lineChartWeek, user.history.heart.week);
                        ChartBuilder.addData(ChartBuilder.lineChartMonth, user.history.heart.month);
                        ChartBuilder.addData(ChartBuilder.lineChartYear, user.history.heart.year);
                    })
                    $('#metaBtnPush').click(function () {
                        document.getElementById('gaugeCarouselReflexPush').setActiveIndex(1);
                        $('#metaBtnPush').addClass("gaugeViewButtonSelected");
                        $('#motionBtnPush').removeClass("gaugeViewButtonSelected");
                        $('#heartBtnPush').removeClass("gaugeViewButtonSelected");
                        ChartBuilder.removeData(ChartBuilder.lineChartDaily);
                        ChartBuilder.removeData(ChartBuilder.lineChartWeek);
                        ChartBuilder.removeData(ChartBuilder.lineChartMonth);
                        ChartBuilder.removeData(ChartBuilder.lineChartYear);
                        ChartBuilder.addData(ChartBuilder.lineChartDaily, user.history.metabolism.day);
                        ChartBuilder.addData(ChartBuilder.lineChartWeek, user.history.metabolism.week);
                        ChartBuilder.addData(ChartBuilder.lineChartMonth, user.history.metabolism.month);
                        ChartBuilder.addData(ChartBuilder.lineChartYear, user.history.metabolism.year);                        
                    })
                    $('#motionBtnPush').click(function () {
                        document.getElementById('gaugeCarouselReflexPush').setActiveIndex(2);
                        $('#motionBtnPush').addClass("gaugeViewButtonSelected");
                        $('#metaBtnPush').removeClass("gaugeViewButtonSelected");
                        $('#heartBtnPush').removeClass("gaugeViewButtonSelected");
                        ChartBuilder.removeData(ChartBuilder.lineChartDaily);
                        ChartBuilder.removeData(ChartBuilder.lineChartWeek);
                        ChartBuilder.removeData(ChartBuilder.lineChartMonth);
                        ChartBuilder.removeData(ChartBuilder.lineChartYear);
                        ChartBuilder.addData(ChartBuilder.lineChartDaily, user.history.motion.day);
                        ChartBuilder.addData(ChartBuilder.lineChartWeek, user.history.motion.week);
                        ChartBuilder.addData(ChartBuilder.lineChartMonth, user.history.motion.month);
                        ChartBuilder.addData(ChartBuilder.lineChartYear, user.history.motion.year);
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
                });
            }
         });