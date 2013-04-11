function box(container, data){
    var pictureMargin = 5,
        color = new Color(),
        boxBorderWidth = 2,
        boxBorderColor = "#333333",
        boxMargin = 5,
        margin = {top: 0, right: 10, bottom: 10, left: 10},
        dayNameWidth = 70,
        width = 500,
        chartWidth = width - margin.left - margin.right - dayNameWidth,
        height = 200 - margin.top - margin.bottom,
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
        draw(weekSummed[1].data, container);
    }
   
    function drawWeek(){
        var dayConainer,
            cssIsStupid;

        isWeekView = true;
        for(var j = 0; j < weekSummed.length; j++){
            dayContainer = container
                .append("div")
                .style("clear", "both")
                .attr("class", "chart");

            cssIsStupid = dayContainer
                .append("div")
                .style("float", "left")
                .style("display", "table")
                .style("width", dayNameWidth+"px")
                .style("height", height+"px"); 

            cssIsStupid
                .append("div")
                .style("display", "table-cell")
                .style("vertical-align", "middle")
                .text(getDayName(weekSummed[j].date.getDay()));

            draw(weekSummed[j].data, dayContainer);
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
    
    function draw(data, container){    
        data = {name: "root",
            children: data};

        var treemap = d3.layout.treemap()
                .size([chartWidth, height])
                .sticky(true)
                .value(function(d){ 
                    return d.sum;
                });
                 
        var div = container.append('div')
            .attr("class", "chart")
            .style("position", "relative")
            .style("width", (chartWidth) +boxMargin+ "px")
            .style("height", (height)+ boxMargin + "px")
            .style("margin-left", margin.left + "px")
            .style("float", "left")
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
                return d.name=="root"?backgroundColor:color.nominal(d.activityCode);
            })
            .style("border-style", "solid")
            .style("border-width", function(d){
                return d.name=="root"?0+"px":boxBorderWidth+"px";
            })
            .style("border-color", function (d) {
                coloz = d3.rgb(color.nominal(d.activityCode));
                return coloz.darker();
            });
        }

        var svg = container.append("svg")
        .attr("height", height)
        .attr("width", width);


    }
}
