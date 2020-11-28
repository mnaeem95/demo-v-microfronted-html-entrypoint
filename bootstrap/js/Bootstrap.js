import {settings} from "./settings";
import {importNodes, xhr} from './dom-utils';
import {addBootstrapEvent, BOOTSTRAP_EVENT} from './events';

let isUserLogged = false;
let routeActive = null;

const getMicroFrontendByRoute = (route) => {
	const parts = (route || '/').substring(1).split('/');
	if (parts.length > 0) {
		return settings.appsByRoute['/' + parts[0]];
	}
	return null;
}

const getMicroFrontendRelativePath = (route) => {
	const microFrontend = getMicroFrontendByRoute(route);
	if (microFrontend) return `${microFrontend.staticFiles}/`;

	return '';
}

const showLoading = (show) => {
	if (show) {
		document.getElementById('loading-bootstrap').hidden = false;
	// 	var img = document.createElement('img');
	// 	img.src ='./images/loading.gif';
	// 	document.getElementById('app').appendChild(img);
	} else {
		document.getElementById('loading-bootstrap').hidden = true;
	// 	const imgLoading = document.getElementById('img-loading');
	// 	if (imgLoading) {
	// 		imgLoading.parentNode.removeChild(imgLoading);
	// 	}
	}
}

const mountMicroFrontend = (route) => {
	// in this phase no micro-frontend is loaded yet. JUST Bootstrap can listen this event
	addBootstrapEvent(BOOTSTRAP_EVENT.WILL_MOUNT, route);

	showLoading(true);

	const indexUrl = `${window.location.origin}${getMicroFrontendRelativePath(route)}index.html`;
	return xhr(indexUrl, 'GET', 'document', null, null)
		.then((doc) => {
			let header = doc.getElementsByTagName('head')[0];
			let body = doc.getElementsByTagName('body')[0];

			const currentHeader = document.getElementsByTagName('head')[0];
			const currentBody = document.getElementById('app');

			if (header.getElementsByTagName('base').length <= 0) {
				var base = document.createElement("base");
				base.href = getMicroFrontendRelativePath(route);
				document.querySelector('head').appendChild(base);
			}

			importNodes(header, currentHeader);
			importNodes(body, currentBody);

			changeUrlInBrowser(route);

			routeActive = route;

			setTimeout(() => {
				// Wait until index.html of the mounted micro-frontend is parsed and rendered to be able to listen the event...
				showLoading(false);
				addBootstrapEvent(BOOTSTRAP_EVENT.DID_MOUNT, route);
			}, 100)
		});

}

const unmountMicroFrontend = () => {
	if (routeActive) {
		addBootstrapEvent(BOOTSTRAP_EVENT.WILL_UNMOUNT, routeActive);

		const currentHeader = document.getElementsByTagName('head')[0];
		const currentBody = document.getElementById('app');

		while (currentHeader.children.length > 0) {
			const item = currentHeader.children[0];
			item.remove()
		}
		while (currentBody.children.length > 0) {
			const item = currentBody.children[0];
			item.remove()
		}

		addBootstrapEvent(BOOTSTRAP_EVENT.DID_UNMOUNT, routeActive);
	}
}

const activeNav = (pathName) => {
	let pathNoSlash = '';
	const parts = (pathName || '/').substring(1).split('/');
	if (parts.length > 0) {
		pathNoSlash = parts[0];
	}

	const navItems = document.getElementsByClassName('nav-link');
	for (let i=0; i< navItems.length; i++) {
		const navItem = navItems[i];
		navItem.classList.remove('active');

		if (navItem.classList.contains(pathNoSlash)) {
			navItem.classList.add("active");
		}
	}
}

const changeUrlInBrowser = (route) => {
	if (route !== settings.notFoundPath) {
		window.history.pushState({}, '', route);
	}
}

const isUserAuthenticated = () => {
	isUserLogged = false;
	return Promise.resolve(isUserLogged);
}

const validateRoute = (route) => {
	return isUserAuthenticated().then((authenticated) => {
		const microFronted = getMicroFrontendByRoute(route);
		if (!microFronted) {
			return Promise.resolve(settings.notFoundPath);
		} else {
			if (!microFronted.requireAuth && authenticated) {
				return Promise.resolve(settings.pathAfterLogin);
			}
			if (microFronted.requireAuth && !authenticated) {
				return Promise.resolve(settings.defaultPath);
			}
			if (route === '/') return Promise.resolve(settings.defaultPath);
			else return Promise.resolve(route);
		}
	});
}

/********************** Bootstrap API *********************/
const navigateTo = (route) => {
	return validateRoute(route).then((path) => {
		unmountMicroFrontend();
		mountMicroFrontend(path);
		activeNav(path);
	});
}

const startMicroFrontend = () => {
	let route = location.pathname;
	if (location.pathname.length > 1 && location.pathname[location.pathname.length - 1] === '/') {
		route = route.substring(0, route.length - 1);
	}

	return validateRoute(route).then((path) => {
		mountMicroFrontend(path);
		activeNav(path);
	});
}

const createBootstrapApi = () => {
	window.bootstrap = {
		router: {navigateTo},
		events: BOOTSTRAP_EVENT
	};
}

export {createBootstrapApi, startMicroFrontend};