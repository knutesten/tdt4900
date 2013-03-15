function ViewModel(){
    var self = this;
    self.charts = ko.observableArray([
        {name: "Kakediagram", draw: pie},
        {name: "Boblediagram", draw: bubbleChart},
        {name: "Tidslinje blokker", draw: timelineBlock}
    ]);

    self.data = new Data();
   
    self.drawGraph = function(d){
        $("#vis").empty();
        d.draw("#vis", self.data);
    }
}

ko.applyBindings(new ViewModel());
