const globals = require("../globals/globals.js");

// "/websocket"
function WebsocketGetHandler() {
	return (req, res, next) => {

        let session = req.session;
        let useremail = session[globals.Userkey];

        if (useremail == undefined) {
            res.render('websocket', {
                    title:   "Websocket",
                    websocket:   "active",
                    noneuser: true
                });
        } else {
            res.render('websocket', {
                    title:   "Websocket",
                    websocket:   "active",
                    username: globals.Username[useremail]
                });
        }

	}
}

module.exports = { WebsocketGetHandler };