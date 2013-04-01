function Data(){
    var self = this;
    this.source = "../csv/test2.csv";
    this.HIGHLIGHT_THRESHOLD = 1 * 1000 * 3600;
    this.weekBlocks = undefined;
    this.week12Hours = undefined;
    this.week = undefined;
    this.weekSummed = undefined;
    
    //TODO: Don't know what to do with this. We could maybe disable the buttons till the parsing is done?
    parseActivPalData(this.source, function(data){
        self.week = combineWalkInterval(data);
        //Remove first and last day because they are incomplete.
        self.week.pop();
        self.week.shift();
        addHighlighting(self.week);
        console.log("Parsing is done.");
    });

    function combineWalkInterval(week){
        var combinedWeek = [];
        for(var j = 0; j < week.length; j++){
            var data = week[j];
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

            combinedWeek.push(newData);
        }
        return combinedWeek;
    }

    function addHighlighting(week){
        for(var i = 0; i < week.length; i++){
            for(var j = 0; j < week[i].length; j++){
                if(week[i][j].interval > self.HIGHLIGHT_THRESHOLD && week[i][j].activityCode === 0){
                    week[i][j].highlight = true;
                }
            }
        }
    }
}

Data.prototype.getWeek = function () {
    return this.week;
};

Data.prototype.getWeekBlocks = function () {
    if (!this.weekBlocks) {
        var week = this.getWeek();
        this.weekBlocks = [];
        for (var i = 0; i < week.length; i++) {
            this.weekBlocks.push(createBlocks(week[i]));
        }
    }
    return this.weekBlocks;
};

Data.prototype.getWeek12Hours = function () {
    if (!this.week12Hours) {
        var week = this.getWeek();
        this.week12Hours = [];
        for (var i = 0; i < week.length; i++) {
            this.week12Hours.push(split12Hours(week[i]));
        }
    }
    return this.week12Hours;
};

Data.prototype.getWeekSummed = function () {
    if (!this.weekSummed) {
        this.weekSummed = [];
        var input = this.getWeek();

        var label = ["Stillesittende", "Stående", "Gående"],
            data,
            element;
        for (var j = 0; j < input.length; j++) {
            data = [];
            element = { date: input[j][0].time };
            for (var k = 0; k < label.length; k++) {
                data[k] = { activityCode: k, sum: 0, activityLabel: label[k] };
            }

            for (var i = 0; i < input[j].length; i++) {
                data[input[j][i].activityCode].sum += input[j][i].interval;
            }

            element.data = data;
            this.weekSummed.push(element);
        }
    }

    return this.weekSummed;
};
