$(function() {
    parseActivPalData("../csv/test2.csv", function (data) {
        timelineBlock(data[0]);
        });
});
