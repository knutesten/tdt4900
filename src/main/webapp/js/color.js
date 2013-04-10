function Color() {
    var self = this;
    this.undefinedColor = "blue";
    this.nominalColors = ["red", "yellow", "green", "blue"];
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
