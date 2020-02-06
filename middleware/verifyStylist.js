const { Stylists } = require("../stylists/stylist-model");

module.exports = {
    validatePortfolioItem,
    vailidateNewStylist

}
function vailidateNewStylist(stylist){
const {username, password, location, email} = stylist;

let errors = [];
	if (!username) {
		errors.push("Please provide a username for the stylist.");
	}
	if (!password) {
		errors.push("Please provide a password for the stylist.");
	}
	if (!location) {
		errors.push("Please provide a location for the stylist.");
    }
    if (!email) {
		errors.push("Please provide an email address for the stylist.");
    }
    
    if(Stylists.findBy(username)){
        errors.push('Username has already been taken. Please pick another.')
    } else if(username){
        Stylists.findBy(username)
        .then(username=>{
            if(!username){
                next();
            }else{
                res.status(400).json({error:"Please choose another username. This one is taken."})
            }
        })
    } 
   

	let success = errors.length === 0;
	let errorMessage = success
		? ""
		: "Information not valid, please see errors for details.";

	return {
		success,
		errorMessage,
		errors
	};


}

function validatePortfolioItem(post) {
	const { image, description, stylist_id } = post;
	let errors = [];
	if (!image) {
		errors.push("Please provide an image url for the post.");
	}
	if (!description) {
		errors.push("Please provide a description for the post.");
	}
	if (!stylist_id) {
		errors.push("Please provide a stylist_id for the post.");
	}

	let success = errors.length === 0;
	let errorMessage = success
		? ""
		: "Information not valid, please see errors for details.";

	return {
		success,
		errorMessage,
		errors
	};
}

//module.exports = (req, res, next) => {
    // 	const stylistId = req.params.stylistId;
    
    // 	Stylists.findById(stylistId)
    // 		.then(stylist => {
    // 			if (!stylist) {
    // 				res
    // 					.status(404)
    // 					.json({ error: "Invalid stylist ID. Stylist not found." });
    // 			} else {
    // 				next();
    // 			}
    // 		})
    // 		.catch(() =>
    // 			res.status(500).json({ error: "There was an error finding the stylist." })
    // 		);
    // };