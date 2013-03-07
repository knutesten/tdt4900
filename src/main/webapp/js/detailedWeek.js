function detailedWeek(input) {

    var height = 800;
    var sheight = 100;
    var swidth = 100;
    var days = new Array();
    var cheight = sheight/24;
    var cwidth = swidth / 24;

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

    gday.append("ol").attr("class", "detailDayList");
    oday.append("ol").attr("class", "detailDayList");
    bday.append("ol").attr("class", "detailDayList");

    for (i = 0; i < input.length; i++) {  
            days[i] = { day: getDayName(input[i][0].time.getDay()), category: classifyDay(input[i]), blocks: createBlocks(input[i])};
    }

    function drawDay(list, day) {
        li = list.append("li")
        svg = li.append("svg")
                .attr("width", swidth)
                .attr("height", sheight)
                .append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", swidth)
                .attr("height", sheight);

    }
}
