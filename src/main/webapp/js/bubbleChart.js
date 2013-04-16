var force = d3.layout.force();
function bubbleChart(container, data){ 
    var isHighlighting = false;
    var data = data.getWeek()[1];
    var width = 500,
        height = 500,
        lwidth = 0,
        highlightStrokeWidth = 3;

    var offset = 35;
    var center = {x: width/2, y: height/2},
        band = [
            {x: width / 2, y: height / 2 + offset},
            {x: width / 2, y: height / 2},
            {x: width / 2, y: height / 2 - offset}
        ];

    var gravity = -0.01,
        friction = 0.90,
        damper = 0.1;
    
    var vis,
        nodes = [],
        circles;
    
    var color = new Color(); 
    
    var container = d3.select(container)
        .append("div")
        .style("width", width + lwidth+ "px");

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
            id: i,
            r: scale(data[i].interval),
            activityCode: data[i].activityCode,
            highlight: data[i].highlight,
            interval: data[i].interval,
            time: data[i].time
        };

        nodes.push(element);
    }
    

    appendLegend(container, "nominal");
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
            .attr("height", height)
            .style("position", "relative")
            .style("float", "left");
        
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
                return color.nominal(d.activityCode);
            })
            .attr("stroke", function(d){ 
                var col = d3.rgb(color.nominal(d.activityCode));
                if(isHighlighting && d.highlight){
                    col = d3.rgb(color.nominal(3));
                }
                return col.darker().darker();
            })
            .attr("stroke-width", function (d) {
                if(isHighlighting && d.highlight){
                    return highlightStrokeWidth;
                }
                return 1.5;
            });
                
        
        circles.transition()
            .duration(2000)
            .attr("r", function(d){
                return d.r;
            });

        circles
            .on("mouseover", showTooltip);

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

        function showTooltip(d){
            d3.select(this)
                .append("svg:title")
                .text("Tidspunkt: " + millisToTime(d.time, false) + "\nLengde: " + millisToTime(d.interval, true));
        }
        
        function millisToTime(time, addSec){
            var sec, min, hou;
            if(time > 3600*1000*24){
                time = time%(3600*1000*24) + 3600 * 1000;
            }
            time = Math.round(time/1000);
            sec = time%60;
            time = (time - sec)/60;
            min = time%60;
            time = (time - min)/60;
            hou = time%24;
            if(addSec){
                return (hou<10?"0":"")+hou+":"+(min<10?"0":"")+min+":"+(sec<10?"0":"")+sec;
            }else{
                return (hou<10?"0":"")+hou+":"+(min<10?"0":"")+min;
            }
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
