function Color() {
    var self = this;
    this.undefinedColor = "blue";
    this.nominalColors = [
      ["white", "#d7df01", "green", "blue"],
      ["white", "#a2a2a2", "#444444", "blue"]
    ];
    this.scales = [
        d3.scale.linear().domain([0, 1]).range(["white", "blue"]),
        d3.scale.linear().domain([0, 1]).range(["white", "red"]),
        d3.scale.linear().domain([0, 1]).range(["white", "#008000"]),
        d3.scale.linear().domain([0, 0.5, 1]).range(["white", "blue", "black"]),
        d3.scale.linear().domain([0, 0.5, 1]).range(["red", "yellow", "green"]),
        d3.scale.linear().domain([0, 1]).range(["white", "black"])
    ];
    //Shades of Gray: http://www.w3schools.com/html/html_colors.asp
    this.grayscaleColors = ["#FFFFFF", "#B0B0B0", "#808080"]
}

Color.prototype.gradient = function (d) {
        if(d!=undefined){
            return this.scales[gradientSelector%this.scales.length](d);
        }
        return this.undefinedColor; 
}

Color.prototype.nominal = function(d){
    if(d!=undefined){
        return this.nominalColors[nominalSelector%this.nominalColors.length][d];
    }
    return this.undefinedColor;
}

Color.prototype.grayscale = function (d) {
    if (d != undefined) {
        return this.grayscaleColors[d];
    }
    return this.undefinedColor;
}
