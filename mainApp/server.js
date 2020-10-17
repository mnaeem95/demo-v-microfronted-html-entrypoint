require('dotenv').config(); // read .env files
const express = require('express');
const cors = require('cors');
const Bootstrap = require('./Bootstrap');

const app = express();
const port = process.env.PORT || 3000;

const corsOpts = {
	origin: '*',
	methods: ['GET', 'POST'],
	allowedHeaders: ['ContentType']
};

app.use(cors(corsOpts));

// Set public folder as root
app.use(express.static('public'));

// Allow front-end access to node_modules folder
app.use('/', express.static(`${__dirname}/public/dist/`));
app.use('/scripts', express.static(`${__dirname}/node_modules/`));
app.use('/css', express.static(`${__dirname}/node_modules/bootstrap/dist/css`));

// Redirect all traffic to index.html
// app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.get('/', function (req, res) {
	res.redirect('/angular');
});

app.get('/angular', function (req, res) {
	const storeHtmlPath = `${__dirname}/public/html/angular/index.html`;
	Bootstrap.mountMicroFrontend('http://localhost:3001', storeHtmlPath, () => {
		res.sendFile(storeHtmlPath, {headers: {'Cache-Control': 'no-cache'}});
	});
});

app.get('/react', function (req, res) {
	const storeHtmlPath = `${__dirname}/public/html/react/index.html`;
	Bootstrap.mountMicroFrontend('http://localhost:3002', storeHtmlPath, () => {
		res.sendFile(storeHtmlPath, {headers: {'Cache-Control': 'no-cache'}});
	});
});

app.get('/vue', function (req, res) {
	const storeHtmlPath = `${__dirname}/public/html/vue/index.html`;
	Bootstrap.mountMicroFrontend('http://localhost:3003', storeHtmlPath, () => {
		res.sendFile(storeHtmlPath, {headers: {'Cache-Control': 'no-cache'}});
	});
});


// Listen for HTTP requests on port 3000
app.listen(port, () => {
	console.log('listening on %d', port);
});