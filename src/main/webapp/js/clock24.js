var test;
function clock24(container, data){
	var width = 400,
	    height = 400;
    var week = data.getWeek();
    var isWeekView = true;
    var isHighlighting = false;
    
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
     
    function drawDay(){
        isWeekView = false;
        draw(week[1]);
    }
   
    function drawWeek(){
        isWeekView = true;
        for(var j = 0; j < week.length; j++){
            draw(week[j]);
        }
    }

    function switchHighlighting(){
        container.selectAll("svg").remove();
        isHighlighting = !isHighlighting;
        if(isWeekView){
            drawWeek();
        }else{
            drawDay();
        }
    }

    function switchView(){
        container.selectAll("svg").remove();
        if(isWeekView){
            drawDay();
        }else{
            drawWeek();
        }
    }
    
    function draw(data){
        var radius = Math.min(width, height) / 2;

        var arc = d3.svg.arc()
            .outerRadius(radius - 20)
            .innerRadius(0);

        var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) { return d.interval; });

        var svg = container.append("svg")
            .attr("width", width)
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
                if(isHighlighting && d.data.highlight){ 
                    return color.nominal(3);
                } 
                return color.nominal(d.data.activityCode); 
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
              .text(function(d) {return d.label; });
    }	
}
