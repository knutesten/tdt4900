function appendGoalPie(container, height, daySummed){
    var goalData = [];
    
    var activity = daySummed.data[1].sum + daySummed.data[2].sum,
        walking = daySummed.data[2].sum;

    var color = new Color();
    var length = Math.floor(activity/activityGoal);
    for(var i = 0; i < length; i++) {
        goalData.push([]);
        goalData[i].push({
            color: color.nominal(1),
            sum: 1
        });
    }
    activity %= activityGoal;
     
    goalData.push([]);
    goalData[i].push({
        color: color.nominal(1), 
        sum: activity
    });

    goalData[i].push({
        color: "white",
        sum: activityGoal - activity
    });

    length = goalData.length + Math.floor(walking/walkingGoal);
    for(var i = goalData.length; i < length; i++){
        goalData.push([]);
        goalData[i].push({
            color: color.nominal(2), 
            sum: 1
        });
    }
    walking %= walkingGoal; 
     
    goalData.push([]);
    goalData[i].push({
        color: color.nominal(2), 
        sum: walking
    });

    goalData[i].push({
        color: "white",
        sum: walkingGoal - walking
    });
    
    var padding = 3,
        margin = {left:10},
        radius = height/2,
        width = radius * goalData.length*2 + padding * (goalData.length - 1);
    
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
        .style("margin-left", margin.left+"px");

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
