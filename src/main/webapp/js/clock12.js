function clock12(container, data){
    var width = 250,
        height = 250,
        dayNameWidth = 70,
        lwidth = 150,
        highlightStrokeWidth = 5;

    var week = data.getWeek12Hours();
    var isWeekView = true
    isHighlighting = false;

    var one = true;
    var two = true;
    
    var color = new Color();
    
    var container = d3.select(container)
        .append("div")
        .style("width", width*2 + dayNameWidth+ lwidth + "px");
 
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
                .text(getDayName(week[j][0][0].time.getDay()));

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
        for(var i = 0; i < data.length; i++){
            var radius = Math.min(width, height) / 2;
    
            var arc = d3.svg.arc()
                .outerRadius(radius - 20)
                .innerRadius(0);
    
            var pie = d3.layout.pie()
                .sort(null)
                .value(function(d) { return d.interval; });
    
            cdiv = container.append("div")
                .style("float", "left")
                .style("position", "relative");

            var csvg = cdiv.append("svg")
                .attr("class", "chart")
                .attr("width", width)
                .attr("height", height);

            csvg.append("image")
                .attr("x", function (d) {
                    if (one) {
                        one = false;
                        return width / 2;
                    }
                    else
                        one = true;
                    return 0;
                })
                .attr("y", 0)
                .attr("height", height)
                .attr("width", width / 2)
                .attr("xlink:href", "/fig/nightsky1.png")
                .attr("preserveAspectRatio", "xMinYMax slice");

            csvg.append("image")
                .attr("x", function (d) { 
                    if (two) {
                        two = false;
                        return 0;
                    }
                    else
                        two = true;
                    return width/2;
                })
                .attr("y", 0)
                .attr("height", height)
                .attr("width", width / 2)
                .attr("xlink:href", "/fig/sunnysky.png")
                .attr("preserveAspectRatio", "xMinYMax slice");

             var svg = csvg.append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

                var g = svg.selectAll(".arc")

                .data(pie(data[i]))
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
                        return [(radius-20)*(d.endAngle - d.startAngle)- 0.1, 1000000].join();
                    } 
                    return "none"; 
                });
                  
                var clockData = [], angle, label;
                for(var j = 0; j < 12; j++){
                        label = (j+11)%12 +1 + 12*i;
                        angle = Math.PI * j /6;
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
                          return "translate(" + arc.centroid(d) + ")";
                      })
                      .style("fill", function(d){
                          if(d.label >= 18 || d.label <= 6 || d.label===12){
                              return "gray";
                          }
                          else
                              return "black";
                      })
                      .attr("dy", ".35em")
                      .style("text-anchor", "middle")
                      
                      .text(function(d) {return d.label; });
        }

        appendLegend(container, "nominal");
    }
}
