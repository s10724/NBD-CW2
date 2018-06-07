printjson(db.people.insert(
{
	"sex" : "Male",
	"first_name" : "Rafal",
	"last_name" : "Namedynski",
	"job" : ".NET Developer",
	"email" : "s10724@pjwstk.edu.pl",
	"location" : {
		"city" : "Warsaw",
		"address" : {
			"streetname" : "Marszalkowska",
			"streetnumber" : "1"
		}
	},
	"description" : "Data ABC, Hello",
	"height" : "180.12",
	"weight" : "100.21",
	"birth_date" : "1993-01-1T01:11:01Z",
	"nationality" : "Poland",
	"credit" : [
		{
			"type" : "maestro",
			"number" : "5217888987954208",
			"currency" : "PLN",
			"balance" : "1000"
		}
	]
}))