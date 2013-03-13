function timeline(container, data){
        var millis = 1000*3600;
        var start = data[0].time;
        var timeOffset = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
        
        var tickValues = [];
        for(var i = 0; i < 24; i++){
                tickValues[i] = i*millis + timeOffset;
        }
        
        var width= 1300, height = 500;
        
        var color = d3.scale.linear().domain([-1, 0,1,2])
	    .range(["white", "lightgray", "yellow", "green"]);
	    
        var svg = d3.select(container).append('svg')
	    .attr("width", width+ 1000)
	    .attr("height", height);
	    
        var x = d3.scale.linear().range([10, width]);
        
        x.domain([timeOffset, data[data.length-1].time.getTime() + data[data.length-1].interval]);
        
	var xAxis = d3.svg.axis()
	        .scale(x)
	        .orient("bottom")
                .tickFormat(function(d){var time = new Date(d); return time.getHours();})
                .tickValues(tickValues);
	
        svg.append("g")
              .attr("class", "x axis")
              .call(xAxis);
              
              
        var rects = svg.selectAll(".bar")
                        .data(data)
                        .enter()
                        .append("rect")
                        .attr("class", "bar")
                        .attr("x", function(d){return x(d.time);})
                        .attr("width", function(d){return x(d.time.getTime() +d.interval) - x(d.time);})
                        .attr("y", 50)
                        .attr("height", 50)
                        .attr("fill", function(d){return color(d.activityCode);})
                        
                        
                        
                    


}
        
