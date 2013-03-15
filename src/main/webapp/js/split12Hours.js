function split12Hours(data){
    var am = [], pm = [], element;
    
    for(var i = 0; i < data.length; i++){
            element = $.extend(true, {}, data[i]);
            element.time = new Date(element.time.getTime());
            if(element.time.getHours() >= 12){
                    pm.push(element);
            }else{
                    am.push(element);
            }
    }
    
    var hour = 3600*1000, newElement, time, timeBeforePm;
    element = am.pop();
    time = element.time.getTime();
    //GMT +1
    timeBeforePm = hour - time%hour;
    if(element.interval > timeBeforePm){
            newElement = $.extend(true, {}, element);
            newElement.time.setTime(time + timeBeforePm);
            newElement.interval = element.interval - timeBeforePm;
            
            element.interval = timeBeforePm;
            element.time = new Date(time);
                    
            pm.unshift(newElement);
    }
    am.push(element);
    
    return [am, pm];
}
