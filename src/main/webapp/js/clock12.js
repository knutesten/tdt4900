var test;
function clock12(container, data){
    var width = 250,
        height = 250;
    var week = data.getWeek12Hours();
    var isWeekView = true;
    
    var container = d3.select(container)
        .append("div")
        .style("width", width*2 + "px");
    
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

    function switchView(){
        container.selectAll("svg").remove();
        if(isWeekView){
            drawDay();
        }else{
            drawWeek();
        }
    }
       
    function draw(data){ 
        for(var i = 0; i < data.length; i++){
	        var radius = Math.min(width, height) / 2;
	
	        var color = d3.scale.ordinal().domain([0,1,2])
	            .range(["lightgray", "yellow", "green"]);
	
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
	            .data(pie(data[i]))
	            .enter().append("g")
	            .attr("class", "arc");
	
	        g.append("path")
	              .attr("d", arc)
	              .style("fill", function(d) { return color(d.data.activityCode); });
	              
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
			      return "translate(" + arc.centroid(d) + ")"; })
                      .attr("dy", ".35em")
                      .style("text-anchor", "middle")
                      .text(function(d) {return d.label; });
                
        }
    }
}
