const http = require('http');

// "/restapi"
function RestApiGetHandler() {
	return (req, res, next) => {

		res.render('restapi', {
				title:   "RESTApi",
				restapi: "active"
			});
	}
}
/*
function RestApiMsgHandler() {
	return (oreq, ores, next) => {

		let SERVER_IP = process.env.SERVER_IP;
		let API_SERVER_PORT = process.env.API_SERVER_PORT;

//		let realAddr = "http://" + SERVER_IP + ":" + API_SERVER_PORT;

		var options = {
			protocol: oreq.protocol + ":",
//			host: oreq.hostname,
			host: SERVER_IP,
			port: API_SERVER_PORT,
			path: oreq.path,
			method: oreq.method,
//			headers: oreq.headers,
			body: oreq.body
		};

		const creq = http
		    .request(options, pres => {
		      pres.setEncoding('utf8');
		      ores.writeHead(pres.statusCode);
		      pres.on('error', e => {
		        console.log(e.message);
		      });
		      pres.on('data', chunk => {
		        ores.write(chunk);
		      });
		      pres.on('close', () => {
		        ores.end();
		      });
		      pres.on('end', () => {
		        ores.end();
		      });
		    })
		    .on('error', e => {
		      try {
		        ores.writeHead(500);
		        ores.write(e.message);
		      } catch (e) {
		      }
		      ores.end();
		    });
		creq.end();
	}
}
*/

// This is a module for HTTP Requests
const request = require('request');

// Callback
function RestApiMsgHandler() {
	return (oreq, ores, next) => {

		let SERVER_IP = process.env.SERVER_IP;
		let API_SERVER_PORT = process.env.API_SERVER_PORT;

		let url = "http://" + SERVER_IP + ":" + API_SERVER_PORT + oreq.path;

		console.log(url);

		request({
//		  'headers': {'content-type' : 'application/x-www-form-urlencoded'},
		  'url': url,
		  'method': oreq.method,
//		  'proxy':'http://yourproxy:8087',
		  'proxy':''
//		  'body':    "mes=heydude"
		}, loaded);

		// Callback for when the request is complete
		function loaded(error, response, body) {
			// Check for errors
			if (!error && response.statusCode == 200) {
				// The raw HTML is in body
				ores.send(body);
			} else {
				ores.send('error');
			}
		}
	}
}

module.exports = { RestApiGetHandler, RestApiMsgHandler };