const settings = {
	appsByRoute: {
		'/': {projectDir: 'angular-app', staticFiles: '/mfe/angular', requireAuth: false},
		'/angular': {projectDir: 'angular-app', staticFiles: '/mfe/angular', requireAuth: false},
		'/react': {projectDir: 'react-app', staticFiles: '/mfe/react', requireAuth: false},
		'/vue': {projectDir: 'vue-app', staticFiles: '/mfe/vue', requireAuth: false},
		'/error': {projectDir: 'error', staticFiles: '/mfe/error', requireAuth: false},
	},
	defaultPath: '/angular',
	notFoundPath: '/error'
};

export {settings};
