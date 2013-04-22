function timelineBlock(container, data, daysToShow){
    var weekBlocks = data.getWeekBlocks();
    var weekSummed = data.getWeekSummed();
    var isWeekView = true;
    var tooltip;
    
    var color = new Color(); 
        width = 700,
        height = 30,
        backgroundColor = "white",
        margin = { 
            left: 0,
            right: 0,
            top: 0,
            bottom: 5 
        }
        dayNameWidth = 70
        boxWidth = (width-dayNameWidth)/24
        boxBorderWidth = 1
        boxBorderColor = "white",
        fontColor = "black";

    var container = d3.select(container)
        .append("div");
    
    container
        .append("div")
        .text("Switch view.")
        .style("margin-bottom", 30 + "px")
        .on("click", switchView);
    
    appendLegend(container, "gradient");

    switchView();
    
    function drawWeek(){
        var dayContainer;
        isWeekView = true;
        for(var j = 0; j < weekBlocks.length; j++){
            dayContainer = container
                .append("div")
                .style("clear", "both")
                .attr("class", "timeline");

            dayContainer
                .append("div")
                .style("float", "left")
                .style("width", dayNameWidth+"px")
                .html(weekBlocks[j].day);

            draw(weekBlocks[j].blocks, dayContainer, weekSummed[j]);
        }
    }

    function drawDay(){
        isWeekView = false;
        draw(weekBlocks[1].blocks, container, weekSummed[1]);
    }
    
    function draw(blocks, container, daySummed){ 
        var div = container
            .append("div")
            .attr("class", "timeline")
            .style("position", "relative")
            .style("float", "left")
            .style("margin-top", margin.top +"px")
            .style("margin-left", margin.left +"px")
            .style("margin-bottom", margin.bottom +"px")
            .style("margin-right", margin.right +"px")
            .style("background-color", backgroundColor);
        
        for(var i = 0; i < 24; i++){
            div.append("div")
               .attr("class", "timeline")
               .call(function (d) {
                   hover(d, blocks[i]);
               })
               .style("background-color", color.gradient(blocks[i].activity))
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

        appendGoalPie(div, height, daySummed);
    }

    function switchView(){
        container.selectAll(".timeline").remove();
        if(isWeekView){
            drawDay();
        }else{
            drawWeek();
        }
    }

    function createTooltip(block) {
        var label = ["Stillesittende", "Stående", "Gående"],
            tooltipText="",
            percentage;
        for(var j = 0; j < block.percentage.length; j++) {
            percentage = Math.round(100 * block.percentage[j]);
            tooltipText = tooltipText + label[j] + ": " + percentage + "%";
            if(j !== block.percentage.length-1) {
                tooltipText = tooltipText + "<br />";
            }
        }

        tooltip = (container).append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .html(tooltipText);

        tooltip.transition()
               .duration(200)
               .style("left", (d3.event.pageX) + "px")
               .style("top", (d3.event.pageY - 28) + "px")
               .style("opacity", 1);
    }

    function removeTooltip() {
        tooltip.transition()
                .duration(500)
                .style("opacity", 0);

        tooltip.remove();
    }

    function hover(element, block) {
        element
            .on("mouseover", function () {
                createTooltip(block);
            })
           .on("mouseout", removeTooltip);
    } 
}
