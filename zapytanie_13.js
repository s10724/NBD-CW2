//(Czemu w tym zadaniu trzeba użyć map-reduce i frameworku do aggregacji?)
//Najprostsze rozwiązanie: 
printjson(db.people.distinct( "job" ))


//aggregate framework
printjson(db.people.aggregate( 
		[
			{ $group: 
				{
					_id: "$job"
				}
			}
		]
).toArray());


//map-reduce
var mapFunction = function() {
		  emit(this.job, {});
};
var reduceFunction = function(key,values) {
	
};			   

					  
db.people.mapReduce(
                     mapFunction,
                     reduceFunction,
                     {  
						out: "job_distinct"
					 }
                   )
				   
printjson(db.job_distinct.find().toArray());