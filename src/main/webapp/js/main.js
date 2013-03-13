$(function() {
    parseActivPalData("../csv/test2.csv", function (data) {
        clock24(data[1]);
        });
});
