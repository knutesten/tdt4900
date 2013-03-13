$(function() {
    parseActivPalData("../csv/test2.csv", function (data) {
        smileyWeek("#mainBody", data);
        });
});
