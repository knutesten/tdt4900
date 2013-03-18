function ViewModel(){
    var self = this;
    self.charts = ko.observableArray([
        {name: "Ukeoversikt", draw: smileyWeek},
        {name: "Detaljert ukeoversikt", draw: detailedWeek},
        {name: "Kakediagram", draw: pie},
        {name: "Boksdiagram", draw: box},
        {name: "Boblediagram", draw: bubbleChart},
        {name: "Tidslinje blokker", draw: timelineBlock},
        {name: "Tidslinje", draw: timeline},
        {name: "Klokke (12 timer)", draw: clock12},
        {name: "Klokke (24 timer)", draw: clock24}
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
    }
}

ko.applyBindings(new ViewModel());
