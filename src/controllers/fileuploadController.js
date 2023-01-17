
// "/fileupload"
function FileuploadGetHandler() {
	return (req, res, next) => {

		res.render('fileupload', {
				title:   "FileUpload",
				fileupload:   "active",
				content: ""
			});
	}
}

module.exports = { FileuploadGetHandler };