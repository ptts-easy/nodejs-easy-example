
// "/nlp"

function NLPGetHandler() {
	return (req, res, next) => {
  
		const sub = req.params.sub;
		const message = "aaa is " + sub;
		const data = {
				layout: "nlp",
				title:   "NLP",
				nlp:   "active",
				message: message,
				content: ""
    	};

		data["nlp"] = "active";

		res.render('nlp-classifier', data);
	};
}

module.exports = { NLPGetHandler };