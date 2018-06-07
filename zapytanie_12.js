//aggregate framework
printjson(db.people.aggregate( 
		[
			{ $unwind: "$credit" },
			{ $group: 
				{
					_id: "$credit.currency",
					total: { $sum: "$credit.balance" }
				}
			}

		]
).toArray());


//map-reduce
var mapFunction = function() {
	this.credit.forEach(function (credit)
	{
		emit(credit.currency, credit.balance);
	});
};
				   
var reduceFunction = function(key, values) {
	sum = 0;
	for (var i = 0; i < values.length; i++) {
		sum += values[i];
	}
    return sum;
};

					  
db.people.mapReduce(
                     mapFunction,
                     reduceFunction,
                     {  
						out: "sum_balance"
					 }
                   )
				   
printjson(db.sum_balance.find().toArray());