function smileyweek(input) {

    var height = 600;
    var days = new Array();
    var upperTime = 0;
    var lowerTime = 0;

    function getDayName(number) {
        var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return weekday[number];
    }

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

    var mdiv = d3.select('body').append('div');
    var gday = mdiv.append('div')
    var oday = mdiv.append('div');
    var bday = mdiv.append('div');
    
    gday.append("img")
        .attr("src", "fig/gday.svg")
        .attr("height", height / 3);
    oday.append("img")
        .attr("src", "fig/oday.svg")
        .attr("height", height / 3);
    bday.append("img")
        .attr("src", "fig/bday.svg")
        .attr("height", height / 3);

    for (i = 0; i < input.length; i++) {
        //console.log(getNameDay(input[i][0].time.getDay()));
        days[i] = {day: getDayName(input[i][0].time.getDay()), inactiveSum: 0, category: 0}
        for (j = 0; j < input[i].length; j++) {
            if (input[i][j].activityCode === 0) {
                days[i].inactiveSum += input[i][j].interval;
            }
        }
        days[i].category = setCategory(days[i].inactiveSum);
        console.log(days[i].day + " Sum: " + days[i].inactiveSum);
    }




/*    for(i=0; i < data.length; i++){
        gday.append("div")
            .text(data[i].time.getDay());
            console.log(data[i].time.getDay());
    }*/
}