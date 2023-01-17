const globals = require("../globals/globals.js");

// "/" => "hello"
function IndexGetHandler() {
	return (req, res, next) => {

		res.redirect('/hello');
	};
}

// "/template"
function TemplateGetHandler() {
	return (req, res, next) => {

        let timestamp = new Date().getTime();

  		res.render('index', { 
  				title: "Template", 
  				template: "active",
  				content: "Hello World ...",
  				object: {user:"user001", msg:"msg001"},
  				timestamp: timestamp,
  				timestamp_odd: timestamp % 2 == 1,
  				users: ["user1", "user2", "user3"]
  			});
  	};
}

// "/route"
function RouteDefaultGetHandler() {
	return (req, res, next) => {

		res.render('route', {
				title:   "Route",
				route:   "active",
				name:    "",
				action:  "",
				act1:   "active",
				message: "This is default route",
				content: ""
			});
	};
}

function RouteGetHandler(req, res, next) {
	return (req, res, next) => {
  
		const name = req.params.name;
		const action = req.params.action;
		const message = name + " is " + action;
		const data = {
				title:   "Route",
				route:   "active",
				name:    name,
				action:  action,
				message: message,
				content: ""
    };

		data[action] = "active";

		res.render('route', data);
	};
}

module.exports = { IndexGetHandler, TemplateGetHandler, RouteDefaultGetHandler, RouteGetHandler };