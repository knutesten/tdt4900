var test;
function clock24(container, data){
	var width = 400,
	    height = 400,
        dayNameWidth = 70,
        lwidth = 150,
        highlightStrokeWidth = 5;

    var week = data.getWeek();
    var isWeekView = true;
    var isHighlighting = false;
    
    var color = new Color();

    var container = d3.select(container)
        .append("div")
        .style("width", width + dayNameWidth + lwidth+ "px");

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
     
    function drawDay(){
        isWeekView = false;
        draw(week[1], container);
    }
   
    function drawWeek(){
        isWeekView = true;

        var dayContainer,
            cssIsStupid;

        for(var j = 0; j < week.length; j++){
            dayContainer = container
                .append("div")
                .style("clear", "both")
                .attr("class", "chart");
                
            cssIsStupid = dayContainer
                .append("div")
                .style("float", "left")
                .style("display", "table")
                .style("width", dayNameWidth+"px")
                .style("height", height + "px");

            cssIsStupid
                .append("div")
                .style("display", "table-cell")
                .style("vertical-align", "middle")
                .text(getDayName(week[j][0].time.getDay()));
                
            draw(week[j], dayContainer);
        }
    }

    function switchHighlighting(){
        container.selectAll(".chart").remove();
        container.selectAll(".lbox").remove();
        isHighlighting = !isHighlighting;
        if(isWeekView){
            drawWeek();
        }else{
            drawDay();
        }
    }

    function switchView(){
        container.selectAll(".chart").remove();
        container.selectAll(".lbox").remove();
        if(isWeekView){
            drawDay();
        }else{
            drawWeek();
        }
    }
    
    function draw(data, container){
        var radius = Math.min(width, height) / 2;

        var arc = d3.svg.arc()
            .outerRadius(radius - 20)
            .innerRadius(0);

        var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) { return d.interval; });

        var svg = container.append("svg")
            .attr("class", "chart")
            .attr("width", width)
            .style("postion", "relative")
            .style("float", "left")
            .attr("height", height)
                .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var g = svg.selectAll(".arc")
              .data(pie(data))
              .enter().append("g")
              .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .style("fill", function(d) {
                return color.nominal(d.data.activityCode); 
            })
            .style("stroke", function(d) {
                if(isHighlighting && d.data.highlight){ 
                    return color.nominal(3);
                } 
                return color.nominal(d.data.activityCode); 
            })
            .style("stroke-width", function (d) {
                if(isHighlighting){
                    if(d.data.highlight){ 
                        return highlightStrokeWidth;
                    } else {
                        return 0.3;
                    }
                } 
                return 0.3; 
            })
            .attr("stroke-dasharray", function (d) {
                if(isHighlighting && d.data.highlight){
                    //Second value is just a really large number. 
                    return [(radius-20)*(d.endAngle - d.startAngle), 1000000].join();
                } 
                return "none"; 
            });
                 
              
        var clockData = [], angle, label;
        for(var j = 0; j < 24; j++){
            label = (j)%24;
            angle = Math.PI * j /12;
            clockData[j] = {label:label, startAngle: angle, endAngle:angle};
        }      

        arc.outerRadius(radius-17);
        var clock = svg.selectAll(".clock")
            .data(clockData)
            .enter()
            .append("g")
            .attr("class", "clock");
        
        clock.append("path")
            .attr("d", arc)
            .attr("stroke", "black")
            .attr("stroke-width", 0.3);
           
           arc.outerRadius(radius*2-15);
           clock.append("text")
              .attr("transform", function(d) {
                  return "translate(" + arc.centroid(d) + ")"; })
              .attr("dy", ".35em")
              .style("text-anchor", "middle")
              .text(function (d) { return d.label; });

           appendLegend(container, "nominal");
    }	
}
