//Returns a list of 24 fractions. Each fraction represents the amount of activity each hour, blocks[0] represents 00, blocks[1] represents 01 and so forth.
function createBlocks(data){
    var currHour = data[0].time.getHours(),
        hour = 3600*1000,
        sumActive = 0,
        blocks = [],
        inteval = 0,
        sum = data[0].time.getTime()%hour,
        activitiyCode = 0;

    var walking = 0,
        sitting = 0,
        standing = 0,
        element = {};

    for(var i = 0; i < data.length; i++){
        interval = data[i].interval;
        activityCode = data[i].activityCode;

        //If the current time interval will exceed the current hour it should be spilt.
        if(sum + interval >= hour || data.length-1 === i){
            timeLeft = hour - sum;

            if(activityCode == 0){
                sitting += timeLeft;
            } else if(activityCode == 1){
                standing += timeLeft;
            } else {
                walking += timeLeft;
            }

            element.activity = (walking+standing)/hour;
            element.percentage = [sitting/hour, standing/hour, walking/hour];
            blocks[currHour] = element;

            walking = 0;
            sitting = 0;
            standing = 0;
            element = {};
            interval -= timeLeft;
        
            //If the interval goes over an hour they should still be spilt.
            while(interval > hour){
                currHour++;
     
                if(activityCode == 0){
                    sitting = hour; 
                } else if(activityCode == 1){
                    standing = hour; 
                } else {
                    walking = hour; 
                }
                
                element.activity = (walking+standing)/hour;
                element.percentage = [sitting/hour, standing/hour, walking/hour];
                blocks[currHour] = element;

                walking = 0;
                sitting = 0;
                standing = 0;
                element = {};

                interval -= hour;
            }

            //If the last entry is an interval longer than 1/2 hour it should be added.
            if(i==data.length-1&&interval>hour/2&&currHour<23){
                currHour++;
     
                if(activityCode == 0){
                    sitting = interval; 
                } else if(activityCode == 1){
                    standing = interval; 
                } else {
                    walking = interval; 
                }

                element.activity = (walking+standing)/hour;
                element.percentage = [sitting/hour, standing/hour, walking/hour];
                blocks[currHour] = element;          
                break;
            }
            
            currHour++;
            sum = interval;
            if(activityCode == 0){
                sitting += interval;
            } else if(activityCode == 1){
                standing += interval;
            } else {
                walking += interval;
            }
        }else{
            //Add interval to sum and sumActive if the current interval was with activity.
            sum+= interval;
            if(activityCode == 0){
                sitting += interval;
            } else if(activityCode == 1){
                standing += interval;
            } else {
                walking += interval;
            }
        }
    }
    return blocks;
}
