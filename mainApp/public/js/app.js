// window.addEventListener('load', () => {
// 	const el = $('#app');
//
// 	// Router Declaration
// 	const router = new Router({
// 		mode: 'history',
// 		page404: (path) => {
// 			const html = '<div class="row">\n' +
// 				'        <div class="col-md-12">\n' +
// 				'            <div class="error-template">\n' +
// 				'                <h1>\n' +
// 				'                    Oops!</h1>\n' +
// 				'                <h2>\n' +
// 				'                    404 Not Found</h2>\n' +
// 				'                <div class="error-details">\n' +
// 				'                    Sorry, an error has occured, Requested page not found!\n' +
// 				'                </div>\n' +
// 				'            </div>\n' +
// 				'        </div>\n' +
// 				'    </div>';
// 			el.html(html);
// 		},
// 	});
//
// 	router.add('/', () => {
// 		const baseUrl = 'http://localhost:3001';
// 		getDOMMicroFrontend(baseUrl, (doc) => {
// 			let header = doc.getElementsByTagName('head')[0];
// 			let body = doc.getElementsByTagName('body')[0];
//
// 			header = changeTagsUrl(header, baseUrl);
// 			body = changeTagsUrl(body, baseUrl);
//
// 			document.getElementsByTagName('head')[0].innerHTML = header.innerHTML;
// 			el.html(body.innerHTML);
// 		});
// 	});
//
// 	router.add('/react', () => {
// 		const baseUrl = 'http://localhost:3002';
// 		getDOMMicroFrontend(baseUrl, (doc) => {
// 			let header = doc.getElementsByTagName('head')[0];
// 			let body = doc.getElementsByTagName('body')[0];
//
// 			header = changeTagsUrl(header, baseUrl);
// 			body = changeTagsUrl(body, baseUrl);
//
// 			document.getElementsByTagName('head')[0].innerHTML = header.innerHTML;
// 			el.html(body.innerHTML);
// 		});
// 	});
//
// 	router.add('/vue', () => {
// 		// const baseUrl = 'http://localhost:3003';
// 		// getDOMMicroFrontend(baseUrl, (doc) => {
// 		// 	let header = doc.getElementsByTagName('head')[0];
// 		// 	let body = doc.getElementsByTagName('body')[0];
// 		//
// 		// 	header = changeTagsUrl(header, baseUrl);
// 		// 	body = changeTagsUrl(body, baseUrl);
// 		// 	document.getElementsByTagName('head')[0].innerHTML = header.innerHTML;
// 		// 	el.html(body.innerHTML);
// 		// });
// 		el.html('Vuew app');
// 	});
//
// 	// Navigate app to current url
// 	router.navigateTo(window.location.pathname);
//
// 	// Highlight Active Menu on Refresh/Page Reload
// 	const link = $(`a[href$='${window.location.pathname}']`);
// 	link.addClass('active');
//
// 	$('a').on('click', (event) => {
// 		// Block browser page load
// 		event.preventDefault();
//
// 		// Highlight Active Menu on Click
// 		const target = $(event.target);
// 		$('.nav-link').removeClass('active');
// 		target.addClass('active');
//
// 		// Navigate to clicked url
// 		const href = target.attr('href');
// 		const path = href.substr(href.lastIndexOf('/'));
// 		router.navigateTo(path);
// 	});
// });
