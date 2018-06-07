//aggregate framework
printjson(db.people.aggregate( 
		[
			{ $match: { nationality: "Poland", sex: "Female"} },
		    { $unwind : "$credit"},
			{ $group: 
				{
					_id: "$credit.currency",
					"totalBalance": {$sum: "$credit.balance"},
					"avgBalance": {$avg: "$credit.balance"}
				}
			}
		]
).toArray());

//map-reduce
var mapFunction = function() {
	if (this.nationality == "Poland" && this.sex == "Female")
	{
		this.credit.forEach(function (credit)
		{
			emit(credit.currency, {count: 1, sum: credit.balance});
		});
	}
};
				   
var reduceFunction = function(key, values) {
	reducedVal = { count: 0, sum: 0 };
	for (var i = 0; i < values.length; i++) {
			reducedVal.count+= values[i].count;
			reducedVal.sum += values[i].sum;
	}
    return reducedVal;
};


var finalizeFunction = function (key, values) {
	totalBalance = values.sum;
	avgBalance = values.sum / values.count;
	return {totalBalance, avgBalance};
};

					  
db.people.mapReduce(mapFunction, reduceFunction,
	{  
		out: "avg_sum_balance",
		finalize: finalizeFunction
	}
)
				   
printjson(db.avg_sum_balance.find({}, {"_id": 1, "value.totalBalance": 1, "value.avgBalance" : 1}).toArray());