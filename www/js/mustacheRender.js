ons.ready(function () {
    data = {
        names: [
            {id:"0" , name: "Luke", img:"https://www.cheme.cornell.edu/engineering2/customcf/iws_news/uploads/alabi__reis.jpg" },
            {id:"1" , name: "Drake", img:"http://www.abc.net.au/news/image/7852476-3x2-940x627.jpg" },
            {id:"2" , name: "Lukes", img:"https://www.cheme.cornell.edu/engineering2/customcf/iws_news/uploads/alabi__reis.jpg" },
            {id:"3" , name: "Lukess", img:"https://www.cheme.cornell.edu/engineering2/customcf/iws_news/uploads/alabi__reis.jpg" },
            {id:"4" , name: "Lukesss", img:"https://www.cheme.cornell.edu/engineering2/customcf/iws_news/uploads/alabi__reis.jpg" },
            {id:"5" , name: "Lukesss", img:"https://www.cheme.cornell.edu/engineering2/customcf/iws_news/uploads/alabi__reis.jpg" },
            {id:"6" , name: "Lukesss", img:"https://www.cheme.cornell.edu/engineering2/customcf/iws_news/uploads/alabi__reis.jpg" },
        ]
    }        

    $.get('views/smartReflex.html', function (templates) {       
        var template = $('#template').html();
        Mustache.parse(template);   // optional, speeds up future uses
        for (let index = 0; index < data.names.length; index++) {
            var rendered = Mustache.render(template, data.names[index]);
            $('#target').append(rendered);
        }
    });
    

    document.addEventListener('init', function (event) {
        var page = event.target;
        if (page.matches('#smartCare')) {
            $.get('views/smartCare.html', function (templates) {
                var template = $('#familyTemplate').html();
                Mustache.parse(template);   // optional, speeds up future uses
                for (let index = 0; index < data.names.length; index++) {
                    var rendered = Mustache.render(template, data.names[index]);
                    $('#family').append(rendered);
                    console.log($('#family'))
                }
            });
        }
    })
});