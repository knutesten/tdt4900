function ViewModel(){
    var self = this;
    self.charts = ko.observableArray([
        {name: "Kakediagram", draw: pie},
        {name: "Boksdiagram", draw: box},
        {name: "Boblediagram", draw: bubbleChart},
        {name: "Tidslinje blokker", draw: timelineBlock},
        {name: "Tidslinje", draw: timeline},
        {name: "Klokke (12 timer)", draw: clock12},
        {name: "Klokke (24 timer)", draw: clock24}
    ]);

    self.data = new Data();
    data = self.data;
    self.drawGraph = function(d){
        $("#vis").empty();
        d.draw("#vis", self.data);
    }
}

ko.applyBindings(new ViewModel());
