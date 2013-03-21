function bubbleChart(container, data){ 
    var isHighlighting = false;
    var data = data.getWeek()[1];
    var width = 1000,
        height = 500;

    var offset = 35;
    var center = {x: width/2, y: height/2},
        band = [
            {x: width / 2, y: height / 2 + offset},
            {x: width / 2, y: height / 2},
            {x: width / 2, y: height / 2 - offset}
        ];

    var force,
        gravity = -0.01,
        friction = 0.90,
        damper = 0.1;
    
    var vis,
        nodes = [],
        circles;
    
    var color = new Color(); 
    
    var force = d3.layout.force();
   
    var container = d3.select(container)
        .append("div")
        .style("width", width + "px");

    container 
        .append("div")
        .text("Highlighting on/off")
        .on("click", switchHighlighting);

    var maxValue = d3.max(data, function(d) {
        return d.interval;
    });
    
    var total = 24 * 3600 * 1000;
    var scale = d3.scale.pow().exponent(0.5).domain([0, total]).range([0, (height)/3]);  
    var cx = width/2, cy = height/2;
    for(var i = 0; i < data.length; i++){
        var element = {
            r: scale(data[i].interval),
            activityCode: data[i].activityCode,
            highlight: data[i].highlight
        };

        nodes.push(element);
    }
    
    draw();

    function switchHighlighting(){
        container.selectAll("svg").remove();
        isHighlighting = !isHighlighting;
        draw();
    }
    
    function draw(){
        force
            .stop();

        vis = container.append("svg")
            .attr("width", width)
            .attr("height", height);
        
        circles = vis.selectAll("circle")
            .data(nodes);

        circles.enter().append("circle")
            .attr("r", 0)
            .attr("cx", function(d){
                return d.cx;
            })
            .attr("cy", function(d){
                return d.cy;
            })
            .attr("fill", function(d){
                if(isHighlighting && d.highlight){
                    return color.nominal(3);
                }
                return color.nominal(d.activityCode);
            })
            .attr("stroke", function(d){ 
                var col = d3.rgb(color.nominal(d.activityCode));
                if(isHighlighting && d.highlight){
                    col = d3.rgb(color.nominal(3));
                }
                return col.darker().darker();
            });
                
        
        circles.transition()
            .duration(2000)
            .attr("r", function(d){
                return d.r;
            });

        force
            .alpha(1)
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
                .each(moveTowardsBand(e.alpha))
                .attr("cx", function(d){
                    return d.x;
                })
                .attr("cy", function(d){
                    return d.y;
                });
        }
        
        function charge(d){
            return Math.min(-Math.pow(d.r, 2)/6, -d.r*0.62);
        }

        function moveTowardsBand(alpha){
            return function(d){
                var target = center.y - ((d.activityCode)-1)* scale(total);
                d.y = d.y + (target - d.y) * damper * alpha * alpha * alpha * 100;
            }
        }

        function moveTowardsCenter(alpha){
            return function (d){
                d.x = d.x + (center.x - d.x) * (damper + 0.02) * alpha;
                d.y = d.y + (center.y - d.y) * (damper + 0.02) * alpha;
            }
        }
    }
}
