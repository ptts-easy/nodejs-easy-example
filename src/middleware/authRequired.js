const globals = require("../globals/globals.js");

function AuthRequired() {
	return (req, res, next) => {

		let session = req.session;

		let useremail = session[globals.Userkey];

		if (useremail == undefined) {
			console.log("User not logged in")
			res.status(302).redirect('/login');			
		} else {
			next();
		}
	}
}

module.exports = { AuthRequired };