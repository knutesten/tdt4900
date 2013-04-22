function Color() {
    var self = this;
    this.undefinedColor = "blue";
    this.nominalColors = ["red", "#d7df01", "green", "blue"];

    //Shades of Gray: http://www.w3schools.com/html/html_colors.asp
    this.grayscaleColors = ["#FFFFFF", "#B0B0B0", "#808080"]
}

Color.prototype.gradient = function(d){
    if(d!=undefined){
        return d3.rgb(255 * (1 - d), 255 * (1 - d) ,255 );
    }
    return this.undefinedColor;
}

Color.prototype.nominal = function(d){
    if(d!=undefined){
        return this.nominalColors[d];
    }
    return this.undefinedColor;
}

Color.prototype.grayscale = function (d) {
    if (d != undefined) {
        return this.grayscaleColors[d];
    }
    return this.undefinedColor;
}
