//aggregate framework
printjson(db.people.aggregate( 
		[
			{ $group: 
				{
					_id: "$nationality",
					avgBMI: { $avg: {$divide: ["$weight", {$pow: [{$divide: ["$height", 100]}, 2]}] } },
					minBMI: { $min: {$divide: ["$weight", {$pow: [{$divide: ["$height", 100]}, 2]}] } },
					maxBMI: { $max: {$divide: ["$weight", {$pow: [{$divide: ["$height", 100]}, 2]}] } }
				}
			}
		]
).toArray());


//map-reduce
var mapFunction = function() {
	var bmi =  this.weight/Math.pow(this.height/100, 2);
	emit(this.nationality, { count: 1, sum:bmi, min: bmi, max:bmi });
};

var reduceFunction = function(key, values) {
	reducedVal = { count: 0, sum: 0, weight: 0, min: values[0].min, max: values[0].max };
	for (var i = 0; i < values.length; i++) {
		reducedVal.count += values[i].count;
		reducedVal.sum += values[i].sum;
		reducedVal.min = Math.min(reducedVal.min, values[i].min);
		reducedVal.max = Math.max(reducedVal.max, values[i].max);
	}
    return reducedVal;
};

var finalizeFunction = function (key, values) {
	avgBMI = values.sum / values.count;
	minBMI = values.min;
    maxBMI = values.max;
	return {avgBMI, minBMI, maxBMI};
};
	
  
printjson(db.people.mapReduce(mapFunction, reduceFunction,
	{  
		out: "bmi",
		finalize: finalizeFunction
	}
));
				   
printjson(db.bmi.find({}, {"_id": 1, "value.avgBMI": 1, "value.minBMI": 1, "value.maxBMI": 1}).toArray());