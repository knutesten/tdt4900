function box(container, data){
	var pictureMargin = 5,
	    color = d3.scale.category20(),
	    boxBorderWidth = 2,
	    boxBorderColor = "black",
	    boxMargin = 5,
            margin = {top: 0, right: 10, bottom: 10, left: 10},
	    width = 500 - margin.left - margin.right,
            height = 200 - margin.top - margin.bottom
	    backgroundColor = "white";

    var imgPath = ["fig/sitting.svg", "fig/standing.svg", "fig/walking.svg"];

    var weekSummed = data.getWeekSummed()
        isWeekView = true;

    var container = d3.select(container)
        .append("div")
        .style("width", width + "px");

    container 
        .append("div")
        .text("Switch view.")
        .style("margin-bottom", 30 + "px")
        .on("click", switchView);

    switchView();
        
    function drawDay(){
        isWeekView = false;
        draw(weekSummed[1]);
    }
   
    function drawWeek(){
        isWeekView = true;
        for(var j = 0; j < weekSummed.length; j++){
            draw(weekSummed[j]);
        }
    }

    function switchView(){
        container.selectAll(".chart").remove();
        if(isWeekView){
            drawDay();
        }else{
            drawWeek();
        }
    }
    
    function draw(data){	
        data = {name: "root",
            children: data};

        var treemap = d3.layout.treemap()
                .size([width, height])
                .sticky(true)
                .value(function(d){ 
                    return d.sum;
                });
                 
        var div = container.append('div')
            .attr("class", "chart")
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
                 return imgPath[d.activityCode];
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
}
