const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const services = require('../services/index.js');

const app = express();

function RunUploadServer(server_ip, server_port) {

	//add other middleware
	app.use(cors());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(morgan('dev'));

	let UPLOAD_PATH = path.join(__dirname, '../../', process.env.UPLOAD_PATH) ;

	app.post('/upload_single', services.ServiceUploadSingleFile(UPLOAD_PATH));
	app.post('/upload_multi', services.ServiceUploadMultiFile(UPLOAD_PATH));
	app.post('/show_storage', services.ServiceShowStorage(UPLOAD_PATH));
	app.post('/clear_storage', services.ServiceClearStorage(UPLOAD_PATH));

	console.log("RunUploadServer::", server_port)

	//start app 
	const port = server_port || 3000;

	app.listen(port, () => 
	  console.log(`App is listening on port ${port}.`)
	);
}

module.exports = { RunUploadServer };