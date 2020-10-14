window.addEventListener('load', () => {
	const el = $('#app');

	// // Compile Handlebar Templates
	// const errorTemplate = Handlebars.compile($('#error-template').html());
	// const ratesTemplate = Handlebars.compile($('#rates-template').html());
	// const exchangeTemplate = Handlebars.compile($('#exchange-template').html());
	// const historicalTemplate = Handlebars.compile($('#historical-template').html());
	//
	// const html = ratesTemplate();
	// el.html(html);

	// Router Declaration
	const router = new Router({
		mode: 'history',
		page404: (path) => {
			const html = '<div class="row">\n' +
				'        <div class="col-md-12">\n' +
				'            <div class="error-template">\n' +
				'                <h1>\n' +
				'                    Oops!</h1>\n' +
				'                <h2>\n' +
				'                    404 Not Found</h2>\n' +
				'                <div class="error-details">\n' +
				'                    Sorry, an error has occured, Requested page not found!\n' +
				'                </div>\n' +
				'            </div>\n' +
				'        </div>\n' +
				'    </div>';
			el.html(html);
		},
	});

	router.add('/', () => {
		let html = '<p>Load Angular micro frontend</p>';
		el.html(html);
	});

	router.add('/react', () => {
		let html = '<p>Load React micro frontend</p>';
		el.html(html);
	});

	router.add('/vue', () => {
		let html = '<p>Load Vue micro frontend</p>';
		el.html(html);
	});

	// Navigate app to current url
	router.navigateTo(window.location.pathname);

	// Highlight Active Menu on Refresh/Page Reload
	const link = $(`a[href$='${window.location.pathname}']`);
	link.addClass('active');

	$('a').on('click', (event) => {
		// Block browser page load
		event.preventDefault();

		// Highlight Active Menu on Click
		const target = $(event.target);
		$('.nav-link').removeClass('active');
		target.addClass('active');

		// Navigate to clicked url
		const href = target.attr('href');
		const path = href.substr(href.lastIndexOf('/'));
		router.navigateTo(path);
	});
});