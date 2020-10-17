const jsdom = require('jsdom');
const axios = require('axios');
const fs = require('fs');

const changeTagsUrl = (elem, baseUrl) => {
	// replace links
	elem.querySelectorAll('link').forEach(link => {
		if(link.href.indexOf(baseUrl) < 0){
			link.href = link.href.startsWith('/') ? baseUrl + link.href: baseUrl + '/' + link.href;
		}
	});

	// replace scripts
	elem.querySelectorAll('script').forEach(script => {
		if(script.src && script.src.indexOf(baseUrl) < 0) {
			script.src = script.src.startsWith('/') ? baseUrl + script.src : baseUrl + '/' + script.src;
		}
	});
	return elem;
}

module.exports = {
	mountMicroFrontend: (baseUrl, htmlPath, callbackFn) => {

		axios.get(baseUrl).then(response => {
			const remoteHtml = response.data;
			const currentHtml = fs.readFileSync(`${__dirname}/public/index.html`, 'utf-8');

			// remote index.html
			var dom = new jsdom.JSDOM(remoteHtml);
			var doc = dom.window.document;
			let header = doc.querySelector('head');
			let body = doc.querySelector('body');
			header = changeTagsUrl(header, baseUrl);
			body = changeTagsUrl(body, baseUrl);

			// current HTML
			var indexDom = new jsdom.JSDOM(currentHtml);
			var indexDoc = indexDom.window.document;

			indexDoc.querySelector('head').innerHTML = header.innerHTML;
			var base = indexDoc.createElement("base");
			base.href = baseUrl;
			indexDoc.querySelector('head').appendChild(base);

			indexDoc.querySelector('#app').innerHTML = body.innerHTML;

			const page = '<!DOCTYPE html><html lang="en">'+indexDoc.documentElement.innerHTML+'</html>';

			// delete html stored before to save the new one
			fs.unlinkSync(htmlPath);
			fs.writeFileSync(htmlPath, page, 'utf-8');

			callbackFn();
		});
	}
};
