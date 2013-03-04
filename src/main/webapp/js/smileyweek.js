function smileyweek(input) {

    var height = 500;
    var days = new Array();
    var upperTime = 61115600;
    var lowerTime = 60115600;

    //Support method to get the name day
    function getDayName(number) {
        var weekday = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];
        return weekday[number];
    }

    //Algorithm used to categorize each day. SUPER ADVANCED!
    function setCategory(time) {
        if (time < lowerTime) {
            return 0;
        }
        else if (time > upperTime) {
            return 2;
        }
        else {
            return 1;
        }
    }

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
    for (i = 0; i < input.length; i++) {
        days[i] = { day: getDayName(input[i][0].time.getDay()), inactiveSum: 0, category: 0 }
        for (j = 0; j < input[i].length; j++) {
            if (input[i][j].activityCode === 0) {
                days[i].inactiveSum += input[i][j].interval;
            }
        }
        days[i].category = setCategory(days[i].inactiveSum);
    }

    //Go through the days and create them in the appropriate category
    for (i = 0; i < days.length; i++) {
        switch (days[i].category) {
            case 0:
                bdiv = bday.append("li")
                           .attr("class", "badLi")
                           .text(days[i].day);
                break;

            case 1:
                odiv = oday.append("li")
                           .attr("class", "okLi")
                           .text(days[i].day);
                break;

            case 2:
                gdiv = gday.append("li")
                           .attr("class", "goodLi")
                           .text(days[i].day);
                break;

        }
    }
};