document.addEventListener('init', function (event) {
    var page = event.target;
    var currentUser = page.data.currentUser;
    if (page.id == "smartReflex") {
        var data;
        document.querySelector('ons-back-button').hide();
        SmartReflex.getUser(currentUser.profile.userid).then(function (messages, doc) {        
                SmartReflex.getScore(currentUser.profile.userid).then(function (message, user) {
                    console.log(doc.devices)
                    if (doc.devices.length === 0) {
                        data = {
                            id: "0",
                            name: "",
                            img: "",
                            meta: 0,
                            heart: 0,
                            motion: 0,
                            step: 0,
                            cal: 0,
                            hr: 0,
                            connections: "",
                            alert: false
                            }
                    } else {
                        data = {
                            id: "0",
                            name: currentUser.profile.firstname,
                            img: currentUser.profile.photo,
                            meta: user.today.scores.metabolism,
                            heart: user.today.scores.heart,
                            motion: user.today.scores.motion,
                            step: user.today.steps,
                            cal: user.today.distance,
                            hr: user.today.HR,
                            connections: doc.connections,
                            alert: user.today.alert
                        }
                    }
                        //Render profile photo
                        var profileTemplate = $('#profileTamplate').html();
                        var profileRendered = Mustache.render(profileTemplate, data);
                        $('#profileTarget').html(profileRendered);
                        //Render Connection
                        data.connections.forEach((connections) => {
                            SmartReflex.getScore(connections.userid).then(function (messages, score) {
                                SmartReflex.getUser(connections.userid).then(function (message, data) {
                                    var connectionData = {
                                        alert: score.today.alert,
                                        hr: score.today.HR,
                                        step: score.today.steps,
                                        cal: score.today.distance,
                                        name: data.profile.firstname,
                                        img: data.profile.photo,
                                        meta: score.today.scores.metabolism,
                                        heart: score.today.scores.heart,
                                        motion: score.today.scores.motion,
                                        id: data.profile.firstname,
                                        userid: data.profile.userid,
                                        relation: connections.relation
                                    }
                                    if (connectionData.alert) {
                                        var template = $('#alertTemplate').html();
                                        Mustache.parse(template);
                                        var rendered = Mustache.render(template, connectionData);
                                        $('#target').append(rendered);
                                    } else {
                                        var template = $('#template').html();
                                        Mustache.parse(template);
                                        var rendered = Mustache.render(template, connectionData);
                                        $('#target').append(rendered);
                                    }
                                    ChartBuilder.createConnectionRadarchart("radarTarget" + connectionData.id, connectionData.meta, connectionData.heart, connectionData.motion, connectionData.alert);
                                })
                            })
                        });
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
                        ChartBuilder.createRadarchart("myChart", data.meta, data.heart, data.motion, data.alert);
                        ChartBuilder.gaugebuilder("heartFit", data.heart);
                        ChartBuilder.gaugebuilder("metabolismFit", data.meta);
                        ChartBuilder.gaugebuilder("motionFit", data.motion);
                        ChartBuilder.linechartBuilder("lineChartDaily", "lineChartWeek", "lineChartMonth", "lineChartYear", user.history.heart);
                        //Button Handle
                        $('#heartBtn').addClass("gaugeViewButtonSelected");
                        $('#dailybtn').addClass("gaugeViewButtonSelected");
                        $('#heartBtn').click(function () {
                            document.getElementById('gaugeCarouselReflex').setActiveIndex(0);
                            $('#heartBtn').addClass("gaugeViewButtonSelected");
                            $('#metaBtn').removeClass("gaugeViewButtonSelected");
                            $('#motionBtn').removeClass("gaugeViewButtonSelected");
                            ChartBuilder.removeData(ChartBuilder.lineChartDaily);
                            ChartBuilder.removeData(ChartBuilder.lineChartWeek);
                            ChartBuilder.removeData(ChartBuilder.lineChartMonth);
                            ChartBuilder.removeData(ChartBuilder.lineChartYear);
                            ChartBuilder.addData(ChartBuilder.lineChartDaily, user.history.heart.day);
                            ChartBuilder.addData(ChartBuilder.lineChartWeek, user.history.heart.week);
                            ChartBuilder.addData(ChartBuilder.lineChartMonth, user.history.heart.month);
                            ChartBuilder.addData(ChartBuilder.lineChartYear, user.history.heart.year);
                        })
                        $('#metaBtn').click(function () {
                            document.getElementById('gaugeCarouselReflex').setActiveIndex(1);
                            $('#metaBtn').addClass("gaugeViewButtonSelected");
                            $('#motionBtn').removeClass("gaugeViewButtonSelected");
                            $('#heartBtn').removeClass("gaugeViewButtonSelected");
                            ChartBuilder.removeData(ChartBuilder.lineChartDaily);
                            ChartBuilder.removeData(ChartBuilder.lineChartWeek);
                            ChartBuilder.removeData(ChartBuilder.lineChartMonth);
                            ChartBuilder.removeData(ChartBuilder.lineChartYear);
                            ChartBuilder.addData(ChartBuilder.lineChartDaily, user.history.metabolism.day);
                            ChartBuilder.addData(ChartBuilder.lineChartWeek, user.history.metabolism.week);
                            ChartBuilder.addData(ChartBuilder.lineChartMonth, user.history.metabolism.month);
                            ChartBuilder.addData(ChartBuilder.lineChartYear, user.history.metabolism.year);
                        })
                        $('#motionBtn').click(function () {
                            document.getElementById('gaugeCarouselReflex').setActiveIndex(2);
                            $('#motionBtn').addClass("gaugeViewButtonSelected");
                            $('#metaBtn').removeClass("gaugeViewButtonSelected");
                            $('#heartBtn').removeClass("gaugeViewButtonSelected");
                            ChartBuilder.removeData(ChartBuilder.lineChartDaily);
                            ChartBuilder.removeData(ChartBuilder.lineChartWeek);
                            ChartBuilder.removeData(ChartBuilder.lineChartMonth);
                            ChartBuilder.removeData(ChartBuilder.lineChartYear);
                            ChartBuilder.addData(ChartBuilder.lineChartDaily, user.history.motion.day);
                            ChartBuilder.addData(ChartBuilder.lineChartWeek, user.history.motion.week);
                            ChartBuilder.addData(ChartBuilder.lineChartMonth, user.history.motion.month);
                            ChartBuilder.addData(ChartBuilder.lineChartYear, user.history.motion.year);
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
                });            
        })

    }
})
document.addEventListener('show', function (event) {
    var page = event.target;
    if (page.matches('#smartReflex')) {
        document.querySelector('ons-back-button').hide();
    }

})