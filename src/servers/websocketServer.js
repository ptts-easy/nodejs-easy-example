const express = require('express');
var app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {path: "/chat/socket.io"});

const services = require('../services/index.js');

function RunWSServer(server_ip, server_port) {

	services.ServiceChatting(io);

	console.log("RunWSServer::", server_port)

	server.listen(server_port, function(){
	   console.log('listening on localhost:', server_port);
	});
}

module.exports = { RunWSServer };