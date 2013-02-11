var test;

$(function() {
        parseActivPalData("../csv/dean.csv", function(data){
                pie(data[1]);
                clock(data[1]);
                timeline(data[1]);
        });
});
