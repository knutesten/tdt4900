function timeline(container, data){
    var week = data.getWeek();
    var isWeekView = true;
    var millis = 1000*3600;
   
    var width= 700, height = 30;
    
    var color = new Color();
   
    var container = d3.select(container)
        .append("div")
        .style("width", width + "px");
    
   container 
        .append("div")
        .text("Switch view.")
        .style("margin-bottom", 30 + "px")
        .on("click", switchView);

   switchView();
     
   function draw(data, drawNumbers){      
        var numberHeight = 12;
        var start = data[0].time;
        var timeOffset = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
        
        var tickValues = [];
        for(var i = 0; i < 24; i++){
                tickValues[i] = i*millis + timeOffset;
        }

        var x = d3.scale.linear().range([10, width]);
        x.domain([timeOffset, timeOffset+3600*1000*24]);
        
        var svg = container.append('svg')
            .style("float", "left")
            .attr("width", width)
            .attr("height", drawNumbers?height+numberHeight:height);

        if(drawNumbers){
            var count = -1;
            svg.selectAll(".numbers")
                .data(tickValues)
                .enter()
                .append("text")
                .attr("class", "numbers")
                .attr("x", function(d){
                    return x(d)+2;
                })
                .attr("y", numberHeight)
                .attr("color", "black")
                .text(function(){
                    count++;
                    return count<10?"0"+count:count;
                });
        }
    
        svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function(d){return x(d.time);})
            .attr("width", function(d){return x(d.time.getTime() +d.interval) - x(d.time);})
            .attr("y", drawNumbers?numberHeight+3:3)
            .attr("height", height)
            .attr("fill", function(d){return color.nominal(d.activityCode);})

        svg.selectAll(".ticks")
            .data(tickValues)
            .enter()
            .append("rect")
            .attr("class", "ticks")
            .attr("x", function(d){
                return x(d);
            })
            .attr("y", 0)
            .attr("width", 1)
            .attr("height", drawNumbers?numberHeight+height:height)
            .attr("fill", "black");
    }
    
    function drawDay(){
        isWeekView = false;
        draw(week[1], true);
    }

    function drawWeek(){
        isWeekView = true;
        for(var i = 0; i < week.length; i++){
            draw(week[i], i===0?true:false);
        }
    }

    function switchView(){
        console.log("switch");
        container.selectAll("svg").remove();
        if(isWeekView){
            drawDay();
        }else{
            drawWeek();
        }
    }
}
