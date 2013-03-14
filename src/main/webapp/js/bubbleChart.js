function bubbleChart(container, data){
    var width = 940,
        height = 600;

    var center = {x: width/2, y: height/2};

    var force,
        gravity = -0.01,
        friction = 0.9,
        damper = 0.1;
    
    var vis,
        nodes = [],
        force,
        circles
        ordered = [[], [], []];
    
    var color = d3.scale.category20();   
    
    for(var i = 0; i < 100; i++){
        var element = {
            r: Math.random()*10,
            activityCode: Math.floor(Math.random()*3)
        };

        nodes.push(element);
        ordered[element.activityCode].push(element);
    }

    nodes.sort(function(a, b){
        return b.activityCode - a.activityCode;
    });

    vis = d3.select(container).append("svg")
        .attr("width", width)
        .attr("height", height);
    
    circles = vis.selectAll("circle")
        .data(nodes);

    circles.enter().append("circle")
        .attr("r", 0)
        .attr("fill", function(d){
            return color(d.activityCode)
        })
        .attr("stroke", "black");
    
    circles.transition()
        .duration(2000)
        .attr("r", function(d){
            return d.r;
        });

    force = d3.layout.force()
        .nodes(nodes)
        .size([width, height]);

    force.gravity(gravity)
        .charge(charge)
        .friction(friction)
        .on("tick", tick);

    force.start();

    function tick(e){
        circles
            .each(moveTowardsCenter(e.alpha))
            .attr("cx", function(d){
                return d.x;
            })
            .attr("cy", function(d){
                return d.y;
            });
    }
    
    function charge(d){
        return -Math.pow(d.r, 2)/6;
    }

    function moveTowardsCenter(alpha, target){
        return function (d){
            d.x = d.x + (center.x - d.x) * (damper + 0.02) * alpha;
            d.y = d.y + (center.y - d.y) * (damper + 0.02) * alpha;
        }
    }
}
