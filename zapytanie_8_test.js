printjson(db.people.find({"location.city" : "Moskwa"}).toArray())