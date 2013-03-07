function timelineBlock(input){
    var blocks = createBlocks(input);
    
    var color = d3.scale.linear().domain([0,1]).range(["red", "green"]),
        width = 1000,
        height = 30,
        backgroundColor = "blue",
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

    var div = d3.select("body")
        .append("div")
        .style("position", "relative")
        .style("margin-top", margin.top)
        .style("margin-left", margin.left)
        .style("margin-bottom", margin.bottom)
        .style("margin-right", margin.right)
        .style("background-color", backgroundColor);
    
    for(var i = 0; i < 24; i++){
        div.append("div")
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
