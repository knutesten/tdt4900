var test;
function clock12(data){
        data = splitData(data);
        
        for(var i = 0; i < data.length; i++){
	        var width = 250,
	            height = 250,
	            radius = Math.min(width, height) / 2;
	
	        var color = d3.scale.ordinal().domain([0,1,2])
	            .range(["lightgray", "yellow", "green"]);
	
	        var arc = d3.svg.arc()
	            .outerRadius(radius - 20)
	            .innerRadius(0);
	
	        var pie = d3.layout.pie()
	            .sort(null)
	            .value(function(d) { return d.interval; });
	
	        var svg = d3.select("body").append("svg")
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
        
        function splitData(data){
                var am = [], pm = [], element;
                
                for(var i = 0; i < data.length; i++){
                        element = $.extend(true, {}, data[i]);
                        element.time = new Date(element.time.getTime());
                        if(element.time.getHours() >= 12){
                                pm.push(element);
                        }else{
                                am.push(element);
                        }
                }
                
                var hour = 3600*1000, newElement, time, timeBeforePm;
                element = am.pop();
		time = element.time.getTime();
		//GMT +1
		timeBeforePm = hour - time%hour;
		if(element.interval > timeBeforePm){
		        newElement = $.extend(true, {}, element);
		        newElement.time.setTime(time + timeBeforePm);
		        newElement.interval = element.interval - timeBeforePm;
		        
		        element.interval = timeBeforePm;
		        element.time = new Date(time);
		                
		        pm.unshift(newElement);
		}
		am.push(element);
		
		
		test = [am, pm];
                return [am, pm];
        }
}
