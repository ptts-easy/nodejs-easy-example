
function ApiGetHandler() {
	return (req, res, next) => {

		let name = req.params.name;
		res.status(200).send(`Hello Get ${name}`);
	}
}

function ApiPostHandler() {
	return (req, res, next) => {

		let name = req.params.name;
		res.status(200).send(`Hello Post ${name}`);
	}
}

function ApiPutHandler() {
	return (req, res, next) => {

		let name = req.params.name;
		res.status(200).send(`Hello Put ${name}`);
	}
}

function ApiDeleteHandler() {
	return (req, res, next) => {

		let name = req.params.name;
		res.status(200).send(`Hello Delete ${name}`);
	}
}

function ApiPatchHandler() {
	return (req, res, next) => {

		let name = req.params.name;
		res.status(200).send(`Hello Patch ${name}`);
	}
}

function ApiHeadHandler() {
	return (req, res, next) => {

		let name = req.params.name;
		res.status(200).send(`Hello Head ${name}`);
	}
}

function ApiOptionsHandler() {
	return (req, res, next) => {

		let name = req.params.name;
		res.status(200).send(`Hello ${name}`);
	}
}

module.exports = { ApiGetHandler, ApiPostHandler, ApiPutHandler, ApiDeleteHandler, ApiPatchHandler, ApiHeadHandler, ApiOptionsHandler };