﻿function smileyWeek(input) {
    var height = 500;
    var days = new Array();

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

    gday.append("ol").attr("class", "dayList");
    oday.append("ol").attr("class", "dayList");
    bday.append("ol").attr("class", "dayList");

    //Extract each day, sum the sedentary time, and set the category based on the sedentary time
    for (var i = 0; i < input.length; i++) {
        days[i] = { day: getDayName(input[i][0].time.getDay()), category: classifyDay(input[i]) };
    }

    //Go through the days and create them in the appropriate category
    for (var i = 0; i < days.length; i++) {
        switch (days[i].category) {
            case 0:
                bday.append("li")
                    .attr("class", "badLi")
                    .text(days[i].day);
                break;

            case 1:
                oday.append("li")
                    .attr("class", "okLi")
                    .text(days[i].day);
                break;

            case 2:
                gday.append("li")
                    .attr("class", "goodLi")
                    .text(days[i].day);
                break;

        }
    }
}
