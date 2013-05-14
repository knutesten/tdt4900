function bar(container, data){
    var weekBlocks = data.getWeekBlocks(),
        weekSummed = data.getWeekSummed(),
        isWeekView = true,
        dayNameWidth = 70;

    var margin = {top: 10, right: 0, left: 25, bottom: 20},
        width = 770 - margin.left - margin.right - dayNameWidth,
        height = 90 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], 0.1);

    var y = d3.scale.linear()
        .rangeRound([height, 0]);

    var color = new Color();

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickValues([0, 20, 40, 60]);

    var container = d3.select(container)
        .append("div");
    
    container
        .append("div")
        .text("Switch view.")
        .style("margin-bottom", 30 + "px")
        .on("click", switchView);
    
    appendLegend(container, "bar"); 

    switchView();
 
    function drawWeek(){
        var dayContainer;
        isWeekView = true;
        for(var j = 0; j < weekBlocks.length; j++){
            dayContainer = container
                .append("div")
                .style("clear", "both")
                .attr("class", "viz");
                
            cssIsStupid = dayContainer
                .append("div")
                .style("float", "left")
                .style("display", "table")
                .style("width", dayNameWidth+"px")
                .style("height", height+ margin.top + margin.bottom + "px");

            cssIsStupid
                .append("div")
                .style("display", "table-cell")
                .style("vertical-align", "middle")
                .text(weekBlocks[j].day);
                
            draw(weekBlocks[j].blocks, dayContainer, weekSummed[j]);
        }
    }

    function drawDay(){
        isWeekView = false;
        dayContainer = container.append("div")
            .attr("class", "viz");

        draw(weekBlocks[1].blocks, dayContainer, weekSummed[1]);
    }
    
    function switchView(){
        container.selectAll(".viz").remove();
        if(isWeekView){
            drawDay();
        }else{
            drawWeek();
        }
    }

    function draw(data, container, daySummed){
        var svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .style("float", "left")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(data.map(function(d, i){
            d.timeLabel = i<10?"0"+i:i;
            return d.timeLabel; 
        }));
        y.domain([0, 60]);

        data.forEach(function(d){
            var y0 = 0;
            d.stack = d.percentage.filter(function(d, i){
                return i>0;
            }).map(function(d, i){
                return {y0: y0, y1: y0 += d*60, color: color.nominal(i+1)};
            });
        });
        
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height +")")
            .call(xAxis);
        
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        var lines = [20, 40, 0];
            
        for (var i in lines) {
          svg.append("g")
            .attr("class", "is")
            .attr("transform", "translate(0, "+ lines[i] +")")
            .append("line")
            .attr("x2", width)
            .attr("y2", 0)
            .style("stroke", "black")
            .style("stroke-width", "1px")
            .style("stroke-dasharray", "3,3");
        }

            
        var state = svg.selectAll(".state")
            .data(data)
            .enter().append("g")
            .attr("class", "g")
            .attr("transform", function(d, i){
                return "translate(" + x(d.timeLabel) + ",0)";
            });
        
        state.selectAll("rect")
            .data(function(d){
                return d.stack;
            })
            .enter().append("rect")
            .attr("width", x.rangeBand())
            .attr("y", function(d){
                return y(d.y1);
            })
            .attr("height", function(d) {
                return y(d.y0) - y(d.y1);
            })
            .style("fill", function(d) {
                return d.color;
            });

        appendGoalPie(container, height/2, daySummed);
    }
}
