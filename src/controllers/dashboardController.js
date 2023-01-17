const globals = require("../globals/globals.js");

// "/dashboard"
function DashboardGetHandler(req, res, next) {
	return (req, res, next) => {

        let session = req.session;
        let useremail = session[globals.Userkey];

        if (useremail == undefined) {
        		res.render('dashboard', {
        				title:   "Dashboard",
        				dashboard:   "active",
                noneuser: true,
        				content:    "This is a dashboard"
        			});
        } else {
            res.render('dashboard', {
                    title:   "Dashboard",
                    dashboard:   "active",
                    username: globals.Username[useremail],
                    content:    "This is a dashboard"
                });
        }
	};
}

module.exports = { DashboardGetHandler };