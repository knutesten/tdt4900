function parseActivPalData(file, callback){
	d3.csv(file, function(rows){
		var data = [];
		for(var i = 0; i < rows.length; i++){
			var row = rows[i];
			data[i] = {
				time: row["Time"].replace(/#/g, ""),
				interval: parseFloat(row["Interval (s)"]),
				activityCode: parseInt(row["ActivityCode (0=sedentary, 1= standing, 2=stepping)"])
			};		
		}
		callback(data)
	});
}
