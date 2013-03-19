function Color() {
    var self = this;
    this.undefinedColor = "blue";
    this.nominalColors = ["#98abc5", "#a05d56", "#ff8c00", "red"];
}

Color.prototype.gradient = function(d){
    if(d!=undefined){
        return d3.rgb(255, 255 * (1 - d), 0);
    }
    return this.undefinedColor;
}

Color.prototype.nominal = function(d){
    if(d!=undefined){
        return this.nominalColors[d];
    }
    return this.undefinedColor;
}
