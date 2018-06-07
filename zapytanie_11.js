//aggregate framework
printjson(db.people.aggregate( 
		[
			{ 
			$group : 
				{
					_id: "$sex",
					averageHeight: { $avg: "$height" },
					averageWeight: { $avg: "$weight" }
				}
			}
		]
).toArray());


//map-reduce
var mapFunction = function() {
	emit(this.sex, { count: 1, height: this.height, weight: this.weight });
};

var reduceFunction = function(key, values) {
	reducedVal = { count: 0, height: 0, weight: 0 };
	for (var i = 0; i < values.length; i++) {
		reducedVal.count += values[i].count;
		reducedVal.height += values[i].height;
		reducedVal.weight += values[i].weight;
	}
    return reducedVal;
};

var finalizeFunction = function (key, values) {
	averageHeight = values.height / values.count;
	averageWeight = values.weight / values.count;
	return {averageHeight, averageWeight};
};

printjson(db.people.mapReduce(mapFunction, reduceFunction,
	{  
		out: "avg_height_weight",
		finalize: finalizeFunction
	}
));

printjson(db.avg_height_weight.find({}, {"_id": 1, "value.averageHeight": 1, "value.averageWeight": 1}).toArray());