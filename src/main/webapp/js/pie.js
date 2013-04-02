function pie(container, data){
    var weekSummed = data.getWeekSummed();
    var isWeekView = true;
     
    var dayNameWidth = 70,
        height = 250,
        width = 2*height,
        radius = Math.min(width, height) / 2;
    
    var color = new Color();
     
    var container = d3.select(container)
        .append("div")
        .style("width", (width + dayNameWidth) + "px");

    container 
        .append("div")
        .text("Switch view.")
        .style("margin-bottom", 30 + "px")
        .on("click", switchView);

    switchView();
        
    function drawDay(){
        isWeekView = false;
        draw(weekSummed[1].data, container);
    }
   
    function drawWeek(){
        isWeekView = true;
        for(var j = 0; j < weekSummed.length; j++){
            dayContainer = container
                .append("div")
                .style("clear", "both")
                .attr("class", "chart");

            cssIsStupid = dayContainer
                .append("div")
                .style("float", "left")
                .style("display", "table")
                .style("width", dayNameWidth+"px")
                .style("height", height+"px"); 

            cssIsStupid
                .append("div")
                .style("display", "table-cell")
                .style("vertical-align", "middle")
                .text(getDayName(weekSummed[j].date.getDay()));

            draw(weekSummed[j].data, dayContainer);
        }
    }

    function switchView(){
        container.selectAll(".chart").remove();
        if(isWeekView){
            drawDay();
        }else{
            drawWeek();
        }
    }
    
    function draw(data, container){
        var arc = d3.svg.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);
        
        var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) { return d.sum; });
        
        var svg = container.append("svg")
            .attr("class", "chart")
            .attr("width", width)
            .attr("height", height);
            
            var pieGroup= svg
            .append("g")
            .attr("class", "pie")
                .attr("transform", "translate(" + width / 4 + "," + height / 2 + ")");
                
        var g = pieGroup.selectAll(".arc")
              .data(pie(data))
            .enter().append("g")
              .attr("class", "arc");
        
        g.append("path")
              .attr("d", arc)
              .style("fill", function(d) { return color.nominal(d.data.activityCode); });
        
        var legend = svg
                .append("g")
                .attr("class", "legend")
                .attr("transform", "translate(" + width/2 + "," + height/9 +")");
        
           legend = legend.selectAll(".legend_entry")
                .data(data)
                .enter()
                .append("g")
                .attr("class", "legend_entry");
                
           legend.append("rect")
                .attr("x", 0)
                .attr("y", function(d){return d.activityCode*height/9;})
                .attr("width", height/10)
                .attr("height", height/10)
                .style("fill", function(d){return color.nominal(d.activityCode)});
           
           legend.append("text")
                .attr("x", height/10+10)
                .attr("y", function(d){return (d.activityCode)*height/9 + height/18;})
                    .attr("dy", ".20em")
                .text(function(d){return d.activityLabel;});
    }
}

 
