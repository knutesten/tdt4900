function Data(){
    var self = this;
    this.source = "../csv/daniel.csv";
    this.weekBlocks = undefined;
    this.week12Hours = undefined;
    this.week = undefined;
    this.weekSummed = undefined;
    
    //TODO: Don't know what to do with this. We could maybe disable the buttons till the parsing is done?
    parseActivPalData(this.source, function(data){
        self.week = data;
        console.log("Parsing is done.");
    });
}

Data.prototype.getWeek = function(){
    return this.week;
}

Data.prototype.getWeekBlocks = function(){
    if(!this.weekBlocks){
        var week = this.getWeek();
        this.weekBlocks = [];
        for(var i = 0; i < week.length; i++){
            this.weekBlocks.push(createBlocks(week[i]));
        }
    }
    return this.weekBlocks;
}

Data.prototype.getWeek12Hours = function(){
    if(!this.week12Hours){
        var week = this.getWeek();
        this.week12Hours = [];
        for(var i = 0; i < week.length; i++){
            this.week12Hours.push(split12Hours(week[i]));
        }
    }
    return this.week12Hours;
}

Data.prototype.getWeekSummed = function(){
    if(!this.weekSummed){
        this.weekSummed = [];
        var input = this.getWeek();

        var label = ["Sitting/Lying", "Standing", "Walking"],
            data;
        for(var j = 0; j < input.length; j++){
            data = [];

            for(var k = 0; k < label.length; k++){
                data[k] = {activityCode: k, sum: 0, activityLabel: label[k]};
            }
             
            for(var i = 0; i< input[j].length; i++){
                var sum = input[j][i].interval;
                data[input[j][i].activityCode].sum += input[j][i].interval;
            }
            
            this.weekSummed.push(data);
        }
    }

    return this.weekSummed;
}
