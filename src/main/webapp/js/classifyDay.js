//Algorithm used to categorize each day. SUPER ADVANCED!
function classifyDay(daySummed) {
    var walkingMet = daySummed.data[2].sum>walkingGoal,
        activityMet = (daySummed.data[1].sum + daySummed.data[2].sum)>activityGoal;
    
    if(walkingMet && activityMet){
        return 2;
    } else if(walkingMet || activityMet){
        return 1;
    } else {
        return 0;
    }
} 


