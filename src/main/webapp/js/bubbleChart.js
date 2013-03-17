var testing;
function bubbleChart(container, data){ 
    var data = combineWalkInterval(data);
    testing = data;
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
        force,
        circles;
    
    var color = d3.scale.category20();   
   
    var maxValue = d3.max(data, function(d) {
        return d.interval;
    });
    
    var total = 24 * 3600 * 1000;
    var scale = d3.scale.pow().exponent(0.5).domain([0, total]).range([0, (height)/3]);  
    var cx = width/2, cy = height/2;
    for(var i = 0; i < data.length; i++){
        var element = {
            r: scale(data[i].interval),
            activityCode: data[i].activityCode
        };

        nodes.push(element);
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
        .attr("cx", function(d){
            return d.cx;
        })
        .attr("cy", function(d){
            return d.cy;
        })
        .attr("fill", function(d){
            return color(d.activityCode)
        })
        .attr("stroke", function(d){ 
            var col = d3.rgb(color(d.activityCode));
            return col.darker().darker();
        });
            
    
    circles.transition()
        .duration(2000)
        .attr("r", function(d){
            return d.r;
        });

    force = d3.layout.force()
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
        return -Math.pow(d.r, 2)/7;
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

    function combineWalkInterval(data){
        var newData = [];   
        var prevElement = $.extend(true, {}, data[0]),
            element;
        for(var i = 1; i < data.length; i++){
            element = $.extend(true, {}, data[i]);
            if(element.activityCode === 2 && prevElement.activityCode === 2){
                prevElement.interval += element.interval; 
            } else{
                newData.push(prevElement);
                prevElement = element;
            }
        }
        newData.push(prevElement);

        return newData;
    }

    start = function(){
        force.start();
    }
}

var start;
