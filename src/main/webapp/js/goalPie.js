function appendGoalPie(container, height, daySummed){
    var goalData = [[], []];

    var walkingGoal = 0.5*3600*1000,
        activityGoal = 5*3600*1000;
    
    var activity = daySummed.data[1].sum + daySummed.data[2].sum,
        walking = daySummed.data[2].sum;

    goalData[0].push({
        color: "steelblue", 
        sum: activity
    });

    if(activityGoal > activity){
        goalData[0].push({
            color: "white",
            sum: activityGoal - activity
        });
    }

    goalData[1].push({
        color: "red", 
        sum: walking
    });

    if(walkingGoal > walking){
        goalData[1].push({
            color: "white",
            sum: walkingGoal - walking
        });
    }
        
    var padding = 10,
        radius = height/2,
        width = radius*4 + padding;
    
    var arc = d3.svg.arc()
        .outerRadius(radius)
        .innerRadius(0); 

    var pie = d3.layout.pie()
        .sort(null)
        .value(function (d) {
            return d.sum;
        });

    var svg = container.append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("float", "left")
        .style("margin-left", padding+"px");

    for(var i = 0; i < goalData.length; i++){
        var g = svg.append("g")
            .attr("transform", "translate(" + (radius + i*(radius*2 + padding)) + "," + height/2 + ")");

        g.selectAll("path")
            .data(pie(goalData[i]))
            .enter()
            .append("path")
            .attr("d", arc)
            .style("fill", function (d) {
                return d.data.color;
            });
    }
}
