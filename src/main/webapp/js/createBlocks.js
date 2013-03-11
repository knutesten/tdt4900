//Returns a list of 24 fractions. Each fraction represents the amount of activity each hour, blocks[0] represents 00, blocks[1] represents 01 and so forth.
function createBlocks(data){
    var currHour = data[0].time.getHours(),
        hour = 3600*1000,
        sumActive = 0,
        blocks = []
        inteval = 0,
        sum = data[0].time.getTime()%hour,
        active = false;

    for(var i = 0; i < data.length; i++){
        interval = data[i].interval;
        if(data[i].activityCode != 0){
            active = true;
        }

        //If the current time interval will exceed the current hour it should be spilt.
        if(sum + interval >= hour || data.length-1 === i){
            timeLeft = hour - sum;
            if(active){
                sumActive += timeLeft;
            }
            blocks[currHour] = sumActive/hour;
            interval -= timeLeft;
        
            //If the interval goes over an hour they should still be spilt.
            while(interval > hour){
                currHour++;
                blocks[currHour] = 0;
                if(active){
                    blocks[currHour] = 1;
                }

                interval -= hour;
            }

            //If the last entry is an interval longer than 1 hour it should be added.
            if(i==data.length-1&&interval>hour/2&&currHour<23){
                currHour++;
                sumActive = 0;
                if(active){
                    sumActive = interval
                }
                blocks[currHour] = sumActive/hour;
                break;
            }
            
            currHour++;
            sumActive = 0;
            if(active){
                sumActive = interval;
            }
            sum = interval;
        }else{
            //Add interval to sum and sumActive if the current interval was with activity.
            sum+= interval;
            if(active){
                sumActive += interval;
            }
        }
        active= false;
    }
    
    return blocks;
}
