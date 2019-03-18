// Links the routes 
var friendsData = require("../data/friends.js");

// Routing
module.exports = function(app){
	app.get("/api/friends", function(req, res) {
		res.json(friendsData);
	});

	// Api POST request to match the user to the most compatible option
	app.post("/api/friends", function(req, res) {
		// Best match object that will hold most compatible friend option
		var bestMatch = {
			name: "",
			photo: "",
			difference: 100 // Match is based on the lowest difference in scores
		}

		var userData = req.body;
		var userScores = userData.scores;

		// This var holds the difference between the score
		var totalDiff = 0;

		// Loops through all users in the database
		for (var i = 0; i < friendsData.length; i++) {
			console.log(friendsData[i].name);
			totalDiff = 0;

			// Loops through all the scores of each friend
			for (var a = 0; a < friendsData[i].scores.length; a++) {
				totalDiff += Math.abs(parseInt(userScores[a]) - parseInt(friendsData[i].scores[a]));

				// Compares the score of each with the best match
				if (totalDiff <= bestMatch.difference) {
					// Updates best match
					bestMatch.name = friendsData[i].name;
					bestMatch.photo = friendsData[i].photo;
					bestMatch.difference = totalDiff;
				}
			}
		}

		// Push the user's data 
		friendsData.push(userData);

		// Returns the user's best match as JSON
		res.json(bestMatch);
	});
};