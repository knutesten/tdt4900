var sumbi = 0;
function pie(input){
	var data = [];
	var label = ["Sitting/Lying", "Standing", "Walking"];
	for(var i = 0; i < 3; i++){
		data[i] = {activityCode: i, sum: 0, activityLabel: label[i]};
	}
	
	for(var i = 0; i< input.length; i++){
		var a = input.activityCode;
		var sum = input[i].interval;
		data[input[i].activityCode].sum += input[i].interval;
	}
	
	console.log("sitting: " + millisToTime(data[0].sum));
	console.log("standing: " + millisToTime(data[1].sum));
	console.log("walking: " + millisToTime(data[2].sum));
	
	sumbi = data[0].sum + data[1].sum + data[2].sum;

	var height = 250,
	    width = 2*height,
	    radius = Math.min(width, height) / 2;
	
	var color = d3.scale.ordinal()
	    .range(["#98abc5", "#a05d56", "#ff8c00"]);
	
	var arc = d3.svg.arc()
	    .outerRadius(radius - 10)
	    .innerRadius(0);
	
	var pie = d3.layout.pie()
	    .sort(null)
	    .value(function(d) { return d.sum; });
	
	var svg = d3.select("body").append("svg")
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
	      .style("fill", function(d) { return color(d.data.activityCode); });
	
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
	        .style("fill", function(d){return color(d.activityCode)});
	   
	   legend.append("text")
	        .attr("x", height/10+10)
	        .attr("y", function(d){return (d.activityCode)*height/9 + height/18;})
                .attr("dy", ".20em")
	        .text(function(d){return d.activityLabel;});
	        
       
}
 function millisToTime(time){
                var sec, min, hou;
                time = Math.round(time/1000);
                sec = time%60;
                time = (time - sec)/60;
                min = time%60;
                time = (time - min)/60;
                hou = time;
                
                return (hou<10?"0":"")+hou+":"+(min<10?"0":"")+min+":"+(sec<10?"0":"")+sec;
        }
