function Data(){
    this.source = "../csv/test2.csv";
    this.weekBlocks = undefined;
    this.week12Hours = undefined;
    this.week = undefined;
    this.paseData =  function(){
        parseActivPalData(this.source, function (data) {
        this.week = data;
    });
    };
}

Data.prototype.getWeek = function(){
    if(!this.week){
        this.parseData();
    }
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
