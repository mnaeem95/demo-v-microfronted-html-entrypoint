import {createBootstrapApi, startMicroFrontend} from "./Bootstrap"
import {BOOTSTRAP_EVENT} from './events'

createBootstrapApi();

window.addEventListener('load', () => startMicroFrontend());

document.addEventListener(BOOTSTRAP_EVENT.WILL_MOUNT, () => {
	console.log('will_mount micro-frontend from Bootstrap');
}, true);

