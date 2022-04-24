const router = require('express').Router();

module.exports = () => {
	router.get('/', (req, res) => {
		return res.render('home');
	});
	return router;
};
