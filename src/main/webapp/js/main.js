var test;

$(function() {
        parseActivPalData("../csv/test2.csv", function(d){
	        test = d;	
	        for(var i = 0; i < d.length; i++){
	                createThePie(d[i]);
	        }
	        
        });
});
