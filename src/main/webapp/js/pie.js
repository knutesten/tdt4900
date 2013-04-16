function pie(container, data){
    var weekSummed = data.getWeekSummed();
    var isWeekView = true;
     
    var dayNameWidth = 70,
        height = 230,
        width = height,
        lwidth = 20
        radius = Math.min(width, height) / 2;
    
    var color = new Color();
     
    var container = d3.select(container)
        .append("div");

    container 
        .append("div")
        .text("Switch view.")
        .style("margin-bottom", 30 + "px")
        .on("click", switchView);

    appendLegend(container, "nominal");

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
                .style("float", "left")
                .style("width", (width + dayNameWidth) + lwidth + "px")
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
            .attr("height", height)
            .style("position", "relative")
            .style("float", "left");
            
            var pieGroup= svg
            .append("g")
            .attr("class", "pie")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
                
        var g = pieGroup.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");
        
        g.append("path")
            .attr("d", arc)
            .style("fill", function(d) { return color.nominal(d.data.activityCode); });

        arc.outerRadius(radius*1.4);
        g.append("text")
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .style("fill", "black")
            .text(function(d) { return Math.round(d.data.sum/(3600*1000*24)*1000)/10 +"%"; });      
    }
}

 
