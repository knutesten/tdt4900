function detailedWeek(input) {

    var height = 800;
    var sheight = 100;
    var swidth = 150;
    var days = new Array();
    var cheight = sheight / 4;
    var cwidth = swidth / 6;

    var count = 0;

    var color = d3.scale.linear().domain([0,1]).range(["red", "green"])

    var mdiv = d3.select('body').append('div').attr("id", "mainBody");
    var gday = mdiv.append('div').attr("id", "goodMainDiv");
    var oday = mdiv.append('div').attr("id", "okMainDiv");
    var bday = mdiv.append('div').attr("id", "badMainDiv");

    gday.append("img")
       .attr("src", "fig/gday.svg")
       .attr("height", height / 3)
       .attr("class", "smileImg");

    oday.append("img")
        .attr("src", "fig/oday.svg")
        .attr("height", height / 3)
        .attr("class", "smileImg");

    bday.append("img")
        .attr("src", "fig/bday.svg")
        .attr("height", height / 3)
        .attr("class", "smileImg");

    gul = gday.append("ul").attr("class", "detailDayList");
    oul = oday.append("ul").attr("class", "detailDayList");
    bul = bday.append("ul").attr("class", "detailDayList");

    for (i = 0; i < input.length; i++) {  
            days[i] = { day: getDayName(input[i][0].time.getDay()), category: classifyDay(input[i]), blocks: createBlocks(input[i])};
    }

    function drawDay(list, day) {
        li = list.append("li")
                 .attr("class", "detailedLi")

        li.append("p").attr("class", "detailedText").text(day.day);

        svg = li.append("svg")
                .attr("width", swidth)
                .attr("height", sheight);

        svg.append("rect")
           .attr("class", setDayStyle(day))
           .attr("x", 0)
           .attr("y", 0)
           .attr("width", swidth)
           .attr("height", sheight);

        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 6; j++) {
                svg.append("rect")
                   .attr("x", j * cwidth)
                   .attr("y", i * cheight)
                   .attr("width", cwidth)
                   .attr("height", cheight)
                   .attr("fill", color(day.blocks[count]));
                count++;
            }

        }
        count = 0;
    }

    function setDayStyle(day) {
        switch (day.category) {
            case 0:
                return "badDaySvg";
            case 1:
                return "okDaySvg";
            case 2:
                return "goodDaySvg";
        }
    }

    drawDay(gul, days[1]);
}
