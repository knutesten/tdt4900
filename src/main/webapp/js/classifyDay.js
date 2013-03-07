//Algorithm used to categorize each day. SUPER ADVANCED!
function classifyDay(time) {
    var upperTime = 61115600;
    var lowerTime = 60115600;

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


