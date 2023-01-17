const globals = require("../globals/globals.js");

function LoginGetHandler() {
	return (req, res, next) => {

		let session = req.session;
		let useremail = session[globals.Userkey];

		if (useremail != undefined) {
			res.render('login', {
					title:   "Login",
					login:   "active",
					username:    globals.Username[useremail],
					content: "Please logout first"
				});
		} else {
			res.render('login', {
					title:   "Login",
					login:   "active"
				});
		}
	}
}

function LoginPostHandler() {
	return (req, res, next) => {

		let session = req.session;
		let useremail = session[globals.Userkey];

		if (useremail != undefined) {
			res.status(400).render("login",
				{
				title:   "Login",
				login:   "active",
				content: "Please logout first",
				username:    globals.Username[useremail]
			})
		} else {
			let useremail = req.body["email"]
			let password = req.body["password"];

			if (EmptyUserPass(useremail, password) == true) {
				res.status(400).render("login",
					{
						title:   "Login",
						login:   "active",
						content: "Parameters can't be empty"
					});
			} else if (CheckUserPass(useremail, password) == false) {
				res.status(400).render("login",
					{
						title:   "Login",
						login:   "active",
						content: "Incorrect email or password"
					});
			} else {
				session[globals.Userkey] = useremail;
				res.status(302).redirect('/dashboard');
			}
		}
	}
}

function LogoutGetHandler() {
	return (req, res, next) => {

		req.session.destroy(function(){
			console.log("user logged out.")
		});

		res.status(302).redirect('/login');
	}
}

function CheckUserPass(useremail, password) {

	console.log("checkUserPass", useremail, password, globals.Userpass[useremail]);

	let val;

	if ((val = globals.Userpass[useremail]) != undefined) {
		console.log(val);
		if (val == password) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

function EmptyUserPass(useremail, password) {
	return (useremail.trim() == "" || password.trim() == "");
}

module.exports = { LoginGetHandler, LoginPostHandler, LogoutGetHandler };