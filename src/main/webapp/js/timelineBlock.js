function timelineBlock(container, data, daysToShow){
    var weekBlocks = data.getWeekBlocks();
    var isWeekView = true;
    
    var color = d3.scale.linear().domain([0,1]).range(["red", "green"]),
        width = 700,
        height = 30,
        backgroundColor = "lightgray",
        margin = { 
            left: 10,
            right: 10,
            top: 10,
            bottom: 10 
        }
        boxWidth = width/24
        boxBorderWidth = 1
        boxBorderColor = "white",
        fontColor = "white",
        fontColor = "white";

    var container = d3.select(container)
        .append("div")
        .style("width", width + "px");
    
    container
        .append("div")
        .text("Switch view.")
        .style("margin-bottom", 30 + "px")
        .on("click", switchView);
    
    switchView();
    
    function drawWeek(){
        isWeekView = true;
        for(var j = 0; j < weekBlocks.length; j++){
            draw(weekBlocks[j]);
        }
    }

    function drawDay(){
        isWeekView = false;
        draw(weekBlocks[1]);
    }
    
    function draw(blocks){ 
        var div = container
            .append("div")
            .attr("class", "timeline")
            .style("position", "relative")
            .style("float", "left")
            .style("margin-top", margin.top)
            .style("margin-left", margin.left)
            .style("margin-bottom", margin.bottom)
            .style("margin-right", margin.right)
            .style("background-color", backgroundColor);
        
        for(var i = 0; i < 24; i++){
            div.append("div")
               .attr("class", "timeline")
               .style("background-color", color(blocks[i]))
               .style("float", "left")
               .style("width", boxWidth - boxBorderWidth+ "px")
               .style("height", height + "px")
               .style("border-style", "solid")
               .style("border-width", "0px 0px 0px " + boxBorderWidth + "px")
               .style("border-color", boxBorderColor)
               .style("text-align", "center")
               .style("color", fontColor)
               .text(i<10?"0"+i:i+"");
        }
    }

    function switchView(){
        container.selectAll(".timeline").remove();
        if(isWeekView){
            drawDay();
        }else{
            drawWeek();
        }
    }
} 
