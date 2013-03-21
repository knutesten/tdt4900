function smileyWeek(container, data) {
    var input = data.getWeek();
    var height = 500;
    var days = new Array();

    var tooltip = 0;
   
    var color = new Color();

    var mdiv = d3.select(container).append('div').attr("id", "smileyDiv");

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

    gul = gday.append("ul").attr("class", "dayList");
    oul = oday.append("ul").attr("class", "dayList");
    bul = bday.append("ul").attr("class", "dayList");

    //Extract each day, sum the sedentary time, and set the category based on the sedentary time
    for (var i = 0; i < input.length; i++) {
        days[i] = { day: getDayName(input[i][0].time.getDay()), category: classifyDay(input[i]) };
    }

    //Go through the days and create them in the appropriate category
    for (var i = 0; i < days.length; i++) {
        var day = days[i];
        switch (days[i].category) {
            case 0:
                bul.append("li")
                    .style("background-color", color.nominal(0))
                    .call(function (d) {
                        createTooltip(d, day);
                    })
                    .attr("class", "badLi")
                    .text(days[i].day);                   
                break;

            case 1:
                oul.append("li")
                    .style("background-color", color.nominal(1))
                    .call(function (d) {
                        createTooltip(d, day);
                    })
                    .attr("class", "okLi")
                    .text(days[i].day);
                break;

            case 2:
                gul.append("li")
                    .style("background-color", color.nominal(2))
                    .call(function (d) {
                        createTooltip(d, day);
                    })
                    .attr("class", "goodLi")
                    .text(days[i].day);
                break;

        }
    }

    function testOver(day) {
        console.log(day);
        tooltip = d3.select(container).append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .text(day.day);

        tooltip.transition()
               .duration(200)
               .style("opacity", 1)
               .style("left", (d3.event.pageX) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
    }

    function testOut() {
        tooltip.transition()
                .duration(500)
                .style("opacity", 0);

        tooltip.remove();
    }

    function createTooltip(element, day){
        element
            .on("mouseover", function () {
                testOver(day);
            })
            .on("mouseout", testOut)
    }
}
