printjson(
db.people.update( 
{first_name: "Antonio"},{$set: { hobby : "ping-pong" }}, {upsert: true, multi: true}
)
)