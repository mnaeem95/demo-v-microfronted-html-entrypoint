export const BOOTSTRAP_EVENT = Object.freeze({
	WILL_MOUNT: 'will_mount',
	DID_UNMOUNT: 'did_unmount',
	DID_MOUNT: 'did_mount',
	WILL_UNMOUNT: 'will_unmount'
});

export const addBootstrapEvent = (eventName, path) => {
	document.dispatchEvent(new CustomEvent(eventName, {
		detail: {path}
	}));
}
