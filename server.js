const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use('/mfe/angular', express.static(`${__dirname}/angular-app/dist/angularApp`));
app.use('/mfe/vue', express.static(`${__dirname}/vue-app/dist`));
app.use('/mfe/react', express.static(`${__dirname}/react-app/build`));
app.use('/mfe/error', express.static(`${__dirname}/error`));
app.use("/", express.static(`${__dirname}/bootstrap/dist`));

app.all('/*', function (req, res) {
	res.sendFile('index.html', {root: './bootstrap/dist'});
});

// Listen for HTTP requests on port 3000
app.listen(port, () => {
	console.log('listening on %d', port);
});