const express = require('express');
const path = require('path');
const debug = require('debug')('app');

const app = express();

if (app.get('env') != 'production') {
	require('dotenv').config();
	app.use(require('morgan')('dev'));
}

// Settings
app.set('view engine', 'pug');

// Default route configs
app.use(
	'/css',
	express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css'))
);
app.use(
	'/js',
	express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'))
);
app.use(
	'/js',
	express.static(path.join(__dirname, 'node_modules/jquery/dist'))
);
app.use(
	'/js',
	express.static(path.join(__dirname, 'node_modules/@popperjs/core/lib'))
);
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index')());

// Send 500 error
app.use((err, req, res, next) => {
	if (err) {
		return res.render('500', { err });
	}
	next();
});

// Send 404 error
app.use((req, res, next) => {
	return res.render('404');
});

const port = process.env.PORT || 5000;
app.listen(port, () => debug(`Server running on port ${port}`));
