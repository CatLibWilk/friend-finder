var bodyParser = require("body-parser");
var friendsArray = require("../data/friends.js");
module.exports = function(app) {
    app.post("/api/friends", (req, res) => {
        
       var newUser = req.body;
       
        var differenceArray = [];

        for(var i = 0; i<friendsArray.length; i++){
                var differenceObj = {
                    name: friendsArray[i].name
                }

                var difference = 0;

            for (var k = 0; k<10; k++){
                    
                userRate = parseInt(newUser.scores[k]);

                friendRate = parseInt(friendsArray[i].scores[k]);

                difference += diff(userRate, friendRate);
                    
            }

            differenceObj.differenceScore = difference
            function diff(a,b){return Math.abs(a-b);}
            differenceArray.push(differenceObj)
            }
            var matches = differenceArray.sort( (a, b) => {
                if(a.differenceScore > b.differenceScore){
                    return 1
                }
                return -1
            });
            console.log(matches[0]);
            var bestMatch = friendsArray.filter( friend => {
                if(friend.name === matches[0].name){
                    return true
                }
            });
            console.log(bestMatch)
            res.json(bestMatch);
    });

};

