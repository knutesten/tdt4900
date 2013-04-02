function timeline(container, data){
    var week = data.getWeek();
    var isWeekView = true,
        isHighlighting = false,
        numberHeight = 12,
        dayNameWidth = 70;
    var millis = 1000*3600;
   
    var width= 700, height = 30;
    
    var color = new Color();
   
    var container = d3.select(container)
        .append("div")
        .style("width", width + "px");

    container 
        .append("div")
        .text("Highlighting on/off")
        .on("click", switchHighlighting);
   
    container 
        .append("div")
        .text("Switch view.")
        .style("margin-bottom", 30 + "px")
        .on("click", switchView);

   switchView();
     
   function draw(data, drawNumbers, container){      
        var start = data[0].time;
        var timeOffset = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
        
        var tickValues = [];
        for(var i = 0; i < 24; i++){
                tickValues[i] = i*millis + timeOffset;
        }

        var x = d3.scale.linear().range([0, width-dayNameWidth]);
        x.domain([timeOffset, timeOffset+3600*1000*24]);
        
        var svg = container.append('svg')
            .style("float", "left")
            .attr("class", "timeline")
            .attr("width", width-dayNameWidth)
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
            .attr("fill", function(d){
                if(isHighlighting && d.highlight){
                    return color.nominal(3);
                }
                return color.nominal(d.activityCode);
            });

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
        draw(week[1], true, container);
    }

    function drawWeek(){
        var dayContainer,
            cssIsStupid;

        isWeekView = true;
        for(var i = 0; i < week.length; i++){
            dayContainer = container
                .append("div")
                .style("clear", "both")
                .attr("class", "timeline");
                
            cssIsStupid = dayContainer
                .append("div")
                .style("float", "left")
                .style("display", "table")
                .style("width", dayNameWidth+"px")
                .style("height", (i===0?numberHeight+height:height)+"px");

            cssIsStupid
                .append("div")
                .style("display", "table-cell")
                .style("vertical-align", "middle")
                .text(getDayName(week[i][0].time.getDay()));

            draw(week[i], i===0?true:false, dayContainer);
        }
    }

    function switchHighlighting(){
        container.selectAll(".timeline").remove();
        isHighlighting = !isHighlighting;
        if(isWeekView){
            drawWeek();
        }else{
            drawDay();
        }
    }

    function switchView(){
        container.selectAll(".timeline").remove();
        if(isWeekView){
            drawDay();
        }else{
            drawWeek();
        }
    }
}
