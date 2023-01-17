const ptts = require("./src/launcher.js");
const globals = require("./src/globals/globals.js");

function main() {

	console.log("==== main() ====")

	console.log(globals.Secret)
	console.log(globals.Userkey)

	ptts.Help()

	ptts.Launcher()
}

main();