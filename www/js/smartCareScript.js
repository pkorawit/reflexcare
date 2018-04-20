var addConnection;
document.addEventListener('init', function (event) {
    var page = event.target;
    var currentUser = page.data.currentUser;
    if (page.id == "smartCare") {
        document.querySelector('ons-back-button').hide();
        SmartReflex.getUser(currentUser.profile.userid).then(function (messages, doc) {
            if (!doc.profile.gender) {
                ons.notification.toast('Please fill all the personal infomation', { timeout: 1000 }).then(function (name) {
                    changeTab('views/personal.html', 'PERSONAL INFO', 3);
                });
            } else {
                addConnection = function (email, relation) {
                    var exist = false;
                    doc.connections.forEach((connections) => {
                        console.log(connections.userid);
                        if (connections.userid == email){
                            exist = true;                            
                        }   
                    });

                    //Not found connection
                    if (!exist) {
                        var newconnection = { userid: email, relation: relation }
                        doc.connections.push(newconnection);
                        SmartReflex.updateUser(doc).then(function (messages, score) {
                            ons.notification.toast('Added smart care to ' + email, { timeout: 1000 }).then(function (name) {
                                changeTab('views/smartReflex.html', 'SMART REFLEX', 1);
                            });
                        });
                    }

                }
                //To render the connection
                doc.connections.forEach((connections) => {
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
                            var template = $('#familyTemplate').html();
                            var recentlyTemplate = $('#recentlyTemplate').html();
                            Mustache.parse(template);
                            Mustache.parse(recentlyTemplate);
                            var rendered = Mustache.render(template, connectionData);
                            var recentlyRendered = Mustache.render(recentlyTemplate, connectionData);
                            //$('#family').append(rendered);
                            $('#recentlyTarget').append(recentlyRendered);
                            doc.connections.forEach((connections) => {
                               var remove = "#" + connections.userid.split('@')[0];                               
                               $(remove).hide();                                                        
                            });
                        })
                    })
                })
            }
        })
    }
})
document.addEventListener('show', function (event) {
    var page = event.target;
    if (page.matches('#smartCare')) {
        document.querySelector('ons-back-button').hide();
    }
})

