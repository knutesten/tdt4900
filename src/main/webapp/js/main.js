$(function() {
        parseActivPalData("../csv/dean.csv", function(data){
		box(data[1]);
        });
});
