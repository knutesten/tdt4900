function stick(input){
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

	var height = 500;
	var div = d3.select("body")
		    .append("div");
	var div2;	
	for(i = 0; i < data.length; i++){
		div2 = div.append("div")
		   .style("margin-left", function(){ return i===0?"0":"10px"; })
		   .style("display", "inline-block")
		   .style("vertical-align", "bottom");
		
		div2.append("img")
		   .attr("height", height*data[i].sum/allSum)
		   .attr("src", data[i].activityLabel);
	}
}
