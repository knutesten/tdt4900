function ViewModel(){
    var self = this;
    self.charts = ko.observableArray([
        {name: "U1", draw: smileyWeek},
        {name: "F1", draw: pie},
        {name: "F3", draw: bubbleChart},
        {name: "T1", draw: timelineBlock},
        {name: "T4", draw: clock24},
        {name: "activPAL", draw: bar}
    ]);

    for(var i = 0; i < self.charts().length; i++){
        self.charts()[i].isSelected = ko.observable(false);
    }
    
    self.data = new Data();
    data = self.data;

    var prevSelected = undefined;

    self.drawChart = function(d){
        if(prevSelected){
            prevSelected.isSelected(false);
        }
        prevSelected = d;
        d.isSelected(true);

        $("#vis").empty();
        d.draw("#vis", self.data);
    };

    self.refresh = function () {
        if(prevSelected){
            $("#vis").empty();
            prevSelected.draw("#vis", self.data);
        }
    };

    self.activityGoal = ko.observable(activityGoal/3600000);
    self.walkingGoal = ko.observable(walkingGoal/3600000);

    self.walkingGoal.subscribe(function (newValue) {
        if(!isNaN(newValue) && newValue>0){
            walkingGoal = newValue * 3600 * 1000;
            self.refresh();
        }
    });

    self.activityGoal.subscribe(function (newValue) {
        if(!isNaN(newValue) && newValue>0){
            activityGoal = newValue * 3600 * 1000;
            self.refresh();
        }
    });
}

var viewModel = new ViewModel();

ko.applyBindings(viewModel);
