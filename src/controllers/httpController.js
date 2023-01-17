
// "/http"
function HTTPHandler() {
	return (req, res, next) => {

		res.status(200).render('http', {
				title:   "HTTP",
				http:   "active",
				content: ""
			});
	};
}

function HTTPInfoHandler() {
	return (req, res, next) => {

		let resp = {
//			"ip": req.headers['x-forwarded-for'] || req.socket.remoteAddress,
			"ip": req.ip,
			"method":     req.method,
			"url":        req.url,
			"get_param":  req.query,
			"post_param": req.body,
			"header":     req.headers,
			"body":       req.body
		};
		res.status(200).json({
			"ip":         resp["ip"],
			"method":     resp["method"],
			"url":        resp["url"],
			"get_param":  resp["get_param"],
			"post_param": resp["post_param"],
			"header":     resp["header"],
			"body":       resp["body"]
		});
	};
}

module.exports = { HTTPHandler, HTTPInfoHandler };