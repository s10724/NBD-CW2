printjson(db.people.find().forEach(function(data) {
	 var arrayToReplace;
	 for (var ii = 0; ii < data.credit.length; ii++) {
		data.credit[ii].balance = parseFloat(data.credit[ii].balance);
	 };
	 arrayToReplace = data.credit;
	 
    db.people.update({
        "_id": data._id,
    }, {
        "$set": {
            "credit": arrayToReplace
        }
    });
}))