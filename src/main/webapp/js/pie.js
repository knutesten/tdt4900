function createThePie(input){
	var data = [];
	for(var i = 0; i < 3; i++){
		data[i] = {activityCode: i, sum: 0};
	}
	
	for(var i = 0; i< input.length; i++){
		var a = input.activityCode;
		var sum = input[i].interval;
		data[input[i].activityCode].sum += input[i].interval;
	} 
	console.log(data);

	var width = 960,
	    height = 500,
	    radius = Math.min(width, height) / 2;
	
	var color = d3.scale.ordinal()
	    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
	
	var arc = d3.svg.arc()
	    .outerRadius(radius - 10)
	    .innerRadius(0);
	
	var pie = d3.layout.pie()
	    .sort(null)
	    .value(function(d) { return d.sum; });
	
	var svg = d3.select("body").append("svg")
	    .attr("width", width)
	    .attr("height", height)
	  .append("g")
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	console.log(pie(data));

	var g = svg.selectAll(".arc")
	      .data(pie(data))
	    .enter().append("g")
	      .attr("class", "arc");
	
	g.append("path")
	      .attr("d", arc)
	      .style("fill", function(d) { return color(d.data.activityCode); });

	 g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.data.activityCode; });
}
