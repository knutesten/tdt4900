function timelineBlock(input){
    var blocks = createBlocks(input);
    
    var color = d3.scale.linear().domain([0,1]).range(["red", "green"]),
        width = 1000,
        height = 30,
        backgroundColor = "lightgray",
        margin = { 
            left: 10,
                right: 10,
            top: 10,
            bottom: 10 
        }
        boxWidth = width/24
        boxBorderWidth = 1
        boxBorderColor = "white",
        fontColor = "white",
        fontColor = "white";

    var div = d3.select("body")
        .append("div")
        .style("position", "relative")
        .style("width", width+"px")
        .style("height", height+ "px")
        .style("margin-top", margin.top)
        .style("margin-left", margin.left)
        .style("margin-bottom", margin.bottom)
        .style("margin-right", margin.right)
        .style("background-color", backgroundColor);
    
    for(var i = 0; i < 24; i++){
        div.append("div")
           .style("background-color", color(blocks[i]))
           .style("float", "left")
           .style("width", boxWidth - boxBorderWidth+ "px")
           .style("height", height + "px")
           .style("border-style", "solid")
           .style("border-width", "0px 0px 0px " + boxBorderWidth + "px")
           .style("border-color", boxBorderColor)
           .style("text-align", "center")
           .style("color", fontColor)
           .text(i<10?"0"+i:i+"");
    }

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
            if(sum + interval >= hour){
                timeLeft = hour - sum;
                if(active){
                    sumActive += timeLeft;
                }
                blocks[currHour] = sumActive/hour;
                interval -= timeLeft;
            
            
                //If the last entry is an interval longer than 1 hour it should be added.
                if(i==data.length-1&&interval<hour){
                    currHour++;
                    sumActive = 0;
                    if(active){
                        sumActive = interval
                    }
                    blocks[currHour] = sumActive/hour;
                    break;
                }
                
                //If the interval goes over an hour they should still be spilt.
                while(interval > hour){
                    currHour++;
                    blocks[currHour] = 0;
                    if(active){
                        blocks[currHour] = 1;
                    }

                    interval -= hour;
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
} 
