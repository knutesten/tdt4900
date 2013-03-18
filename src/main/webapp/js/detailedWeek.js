function detailedWeek(container, data) {
    var input = data.getWeek();
    var height = 800;
    var sheight = 100;
    var swidth = 150;
    var days = new Array();
    var cheight = sheight / 4;
    var cwidth = swidth / 6;
    var strokePadding = 10;
    var hourStrokePadding = 2;

    var count = 0;
    
    var color = new Color();
    var mdiv = d3.select(container).append('div').attr("id", "mainDiv");
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

   for (var i = 0; i < days.length; i++) {
        switch (days[i].category) {
            case 0:
                drawDay(bul, days[i]);
                break;
            case 1:
                drawDay(oul, days[i]);
                break;

            case 2:
                drawDay(gul, days[i]);
                break;
        }
    }

    function drawDay(list, day) {
        li = list.append("li")
                 .attr("class", "detailedLi")

        li.append("p").attr("class", "detailedText").text(day.day);

        svg = li.append("svg")
                .attr("width", swidth +strokePadding)
                .attr("height", sheight + strokePadding);

        svg.append("rect")
           .attr("class", setDayStyle(day))
           .attr("x", 0)
           .attr("y", 0)
            //gjøre disse relative i forhold til swidth og sheight?
           .attr("rx", 20)
           .attr("ry", 20)
           .attr("width", swidth + strokePadding)
           .attr("height", sheight + strokePadding)
           .style("stroke-width", strokePadding);

        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 6; j++) {
                svg.append("rect")
                   .attr("x", (j * cwidth) + (strokePadding / 2))
                   .attr("y", (i * cheight) + (strokePadding / 2))
                    //Vi burde gjør denne verdien relativ til cwidth og cheight?
                   .style("stroke-width", hourStrokePadding)
                   .style("stroke", "black")
                   .attr("width", cwidth)
                   .attr("height", cheight)
                   .attr("fill", color.gradient(day.blocks[count]));

                svg.append("text")
                   .attr("x", (j * cwidth) + (strokePadding / 2) + hourStrokePadding)
                   .attr("y", (i * cheight) + (strokePadding / 2) + cheight - hourStrokePadding)
                   .attr("font-size", cwidth/2)
                   .text(count + 1);

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


}
