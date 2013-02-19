function box(input){
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
	
	data = {name: "root",
		children: data};

	var margin = {top: 40, right: 10, bottom: 10, left: 10},
	    width = 500 - margin.left - margin.right,
            height = 200 - margin.top - margin.bottom;

	var color = d3.scale.category20c();

	var treemap = d3.layout.treemap()
			.size([width, height])
			.sticky(true)
			.value(function(d){ 
				return d.sum
			}); 

	var div = d3.select('body').append('div')
		.style("position", "relative")
		.style("width", (width + margin.left + margin.right) + "px")
		.style("height", (height + margin.top + margin.bottom) + "px")
		.style("left", margin.left + "px")
		.style("top", margin.top + "px");



	var node = div.datum(data).selectAll(".node")
		 .data(treemap.nodes)
		 .enter().append("div")
		 .attr("class", "node")
		 .call(position)
		 .style("position", "absolute")
		 .style("background", function(d) { 
			 return color(d.activityCode);
		 });

	function position() {
		this.style("left", function(d) { 
			return d.x + "px"; })
		.style("top", function(d) { 
			return d.y + "px"; })
		.style("width", function(d) { 
			return Math.max(0, d.dx - 1) + "px"; })
		.style("height", function(d) { 
			return Math.max(0, d.dy - 1) + "px"; });
	}
		 
}
