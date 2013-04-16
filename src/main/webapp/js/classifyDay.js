//Algorithm used to categorize each day. SUPER ADVANCED!
function classifyDay(day) {
    var time = 0;
    var upperTime = 61115600;
    var lowerTime = 60115600;
    for (var i = 0; i < day.length; i++) {
        if (day[i].activityCode === 0) {
            time += day[i].interval;
        }

    }
    if (time < lowerTime) {
        return 2;
    }
    else if (time > upperTime) {
        return 0;
    }
    else {
        return 1;
    }
}


