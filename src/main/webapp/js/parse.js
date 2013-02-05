function parseActivPalData(file, callback){
	this.millADay = 1000 * 3600 * 24;

	d3.csv(file, function(rows){
		//The first and the last value contains some non-pertient information
		rows.shift();
		rows.pop();

		var i = 0;
		var data = [], day = [], element, row, currDay;
		for(var i = 0; i < rows.length; i++){
			row = rows[i];
			element = {
				time: new Date(row["Time"].replace(/#/g, "")),
				interval: parseFloat(row["Interval (s)"])*1000,
				activityCode: parseInt(row["ActivityCode (0=sedentary, 1= standing, 2=stepping)"])
			};

			if(currDay === undefined){
				currDay = element.time.getDay();
			}
			
			if(currDay === element.time.getDay()){
				day.push(element);
			}else{
				currDay = element.time.getDay();
				data.push(day);
				day = [element];
			}
		}
		data.push(day);

		//Split the last entries so they don't go over multiple days
		var newElement, time, timeBeforeMidnight, millisADay = 1000*3600*24;
		for(var i = 0; i < data.length; i++){
			element = data[i].pop();
			time = element.time.getTime();
			//GMT +1
			timeBeforeMidnight = millisADay - time%millisADay - 3600*1000;
			if(element.interval > timeBeforeMidnight){
			        newElement = $.extend(true, {}, element);
			        newElement.time.setTime(time + timeBeforeMidnight);
			        newElement.interval = element.interval - timeBeforeMidnight;
			        
			        element.interval = timeBeforeMidnight;
			        element.time = new Date(time);
			}
			
			data[i].push(element);
			if(i < data.length-1){
			        data[i+1].unshift(newElement);
			}
		}

		console.log(data);
		
		callback(data)
	});
}
