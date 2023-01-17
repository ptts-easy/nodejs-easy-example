const servers = require("./servers/index.js");
require("dotenv/config");

function Help() {

	let help_message = "Help";
	console.log(help_message);
}

function Launcher() {

	let SERVER_IP = process.env.SERVER_IP;
	let HTTP_SERVER_PORT = process.env.HTTP_SERVER_PORT;
	let API_SERVER_PORT = process.env.API_SERVER_PORT;
	let WS_SERVER_PORT = process.env.WS_SERVER_PORT;
	let FILE_SERVER_PORT = process.env.FILE_SERVER_PORT;

	console.log("HTTP_SERVER_PORT = ", HTTP_SERVER_PORT);
	console.log("API_SERVER_PORT = ", API_SERVER_PORT);
	console.log("WS_SERVER_PORT = ", WS_SERVER_PORT);
	console.log("FILE_SERVER_PORT = ", FILE_SERVER_PORT);

	(async () => {
		servers.RunApiServer(SERVER_IP, API_SERVER_PORT);
	})();

	(async () => {
		servers.RunUploadServer(SERVER_IP, FILE_SERVER_PORT);
	})();

	(async () => {
		servers.RunWSServer(SERVER_IP, WS_SERVER_PORT);
	})();

	servers.RunHttpServer(SERVER_IP, HTTP_SERVER_PORT)
}

module.exports = { Help, Launcher };