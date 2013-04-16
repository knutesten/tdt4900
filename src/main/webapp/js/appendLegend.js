function appendLegend(container, type, position) {    
    var color = new Color();
    if(type === "gradient"){
        var svg = container
            .append("svg")
            .attr("width", 500)
            .attr("height", 100)
            .attr("class", "legend");
    
        var length = 6,
            data = [],
            gradWidth = 40;
            gradHeight = 40;

        for(var i = 0; i < length; i++){
            data.push(i/(length-1));
        }
       
        svg.append("text")
            .text("Aktivitetsnivå i prosent av tid gående/stående:")
            .attr("x", 0)
            .attr("y", 20);

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("width", gradWidth)
            .attr("height", gradHeight)
            .attr("x", function(d, i){
                return i*gradWidth;
            })
            .attr("y", 30)
            .attr("fill", function(d) {
                return color.gradient(d);
            })
            .attr("stroke", "black");

       svg.selectAll(".numbers")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "numbers")
            .text(function (d) {
                return Math.round(d*100) + "%";
            })
            .attr("x", function (d, i) {
                var text = Math.round(d*100) + "%";
                return i*gradWidth + gradWidth/2 - text.length*4 ;
            })
            .attr("y", gradHeight+45);
    }
    if (type === "nominal") {

        var lwidth = 150,
            height = 200,
            data = [0, 1, 2];

        var svg = container.append("svg")
            .attr("class", "lbox")
            .attr("width", lwidth)
            .attr("height", height - 100)
            .style("display","block");
          //  .style("float", "left");

        var legend = svg
                .append("g")
                .attr("class", "legend")
                .attr("transform", "translate(" + 20 + "," + 5 + ")");

        legend = legend.selectAll(".legend_entry")
               .data(data)
               .enter()
               .append("g")
               .attr("class", "legend_entry");

        legend.append("rect")
                .attr("x", 0)
                .attr("y", function (d) { return d * height / 7; })
                .attr("width", height / 8)
                .attr("height", height / 8)
                .style("fill", function (d) { return color.nominal(d) });

        legend.append("text")
                .attr("x", height / 10 + 10)
                .attr("y", function (d) { return (d) * height / 7 + height / 18; })
                    .attr("dy", ".20em")
                .text(function (d) { return codeToLabel(d); });
    }
}
