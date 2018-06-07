printjson(db.people.find().forEach(function(data) {
    db.people.update({
        "_id": data._id,
    }, {
        "$set": {
            "height": parseFloat(data.height),
			"weight": parseFloat(data.weight)
        }
    });
}))