function box(input){
	var pictureMargin = 5,
	    color = d3.scale.category20(),
	    boxBorderWidth = 2,
	    boxBorderColor = "black",
	    boxMargin = 5,
            margin = {top: 40, right: 10, bottom: 10, left: 10},
	    width = 500 - margin.left - margin.right,
            height = 200 - margin.top - margin.bottom
	    backgroundColor = "white";

	var data = [];
	var label = ["fig/sitting.svg", "fig/standing.svg", "fig/walking.svg"];
	for(var i = 0; i < 3; i++){
		data[i] = {activityCode: i, sum: 0, activityLabel: label[i]};
	}
	
	var a, sum, allSum=0;
	for(var i = 0; i< input.length; i++){
		a = input.activityCode;
		sum = input[i].interval;
		allSum += sum;
		data[input[i].activityCode].sum += input[i].interval;
	}
	
	data = {name: "root",
		children: data};

	var treemap = d3.layout.treemap()
			.size([width, height])
			.sticky(true)
			.value(function(d){ 
				return d.sum;
			});
			 
	var div = d3.select('body').append('div')
		.style("position", "relative")
		.style("width", (width) +boxMargin+ "px")
		.style("height", (height)+ boxMargin + "px")
		.style("left", margin.left + "px")
		.style("top", margin.top + "px")
		.style("background-color", backgroundColor);
	
	var node = div.datum(data).selectAll(".node")
		 .data(treemap.nodes)
		 .enter().append("div")
		 .attr("class", "node")
		 .call(position)
		 .style("position", "absolute")
		 .append("img")
		 .style("display", "block")
		 .style("margin","auto")
		 .style("margin-top",pictureMargin/2+ "px")
		 .attr("src", function(d){
			 return d.activityLabel;
		 })
		 .attr("height", function(d) { 
			 return Math.max(0, d.dy - 1) - pictureMargin - boxMargin + "px";		
		 });

	function position() {
		this.style("left", function(d) {
			return (d.x + boxMargin - boxBorderWidth) + "px"; })
		.style("top", function(d) { 
			return (d.y + boxMargin - boxBorderWidth) + "px"; })
		.style("width", function(d) { 
			return Math.max(0, d.dx - boxMargin) + "px"; })
		.style("height", function(d) { 
			return Math.max(0, d.dy - boxMargin) + "px"; })
		.style("background", function(d) { 
			return d.name=="root"?backgroundColor:color(d.activityCode);
		})
		.style("border-style", "solid")
		.style("border-width", function(d){
			return d.name=="root"?0+"px":boxBorderWidth+"px";
		})
		.style("border-color", boxBorderColor);
	}
		 
}
