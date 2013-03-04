$(function() {
    parseActivPalData("../csv/test2.csv", function (data) {
        pie(data[2]);
        });
});
