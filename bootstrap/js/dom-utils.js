const xhr = (url, method, responseType, headers, data) => {
	if (!method) method = 'GET';
	if (!responseType) responseType = 'json';

	var request = new XMLHttpRequest();
	request.responseType = responseType;

	return new Promise((resolve, reject) => {
		request.ontimeout = () => reject(new Error(`Error timeout while trying to get file ${url}`));
		request.onload = () => {
			if (request.status >= 400) {
				reject(new Error(`Error while trying to get file ${url}`));
			}
			resolve(request.response);
		};
		request.onerror = () => reject(new Error(`An error occurred while trying to get file ${url}`));

		request.open(method, url);

		if (headers && Object.keys(headers).length > 0) {
			for (const key in headers) {
				request.setRequestHeader(key, headers[key]);
			}
		}

		request.send(data ? JSON.stringify(data) : null);
	});
};

const updateElementAttributes = (source, target) => {
	for (let i = 0; i < source.attributes.length; i++) {
		const attr = source.attributes[i];
		target[attr.name] = source[attr.name];
	}
}

const importNodes = (source, target) => {
	// alert('total: ' + source.children.length);
	while (source.children.length > 0) {
		const item = source.children[0];

		if ('SCRIPT' === item.nodeName) {
			var script = document.createElement("script");
			if (item.src) {
				updateElementAttributes(item, script);
				target.appendChild(script);
			} else {
				const inlineScript = document.createTextNode(item.textContent);
				if (item.attributes.length > 0) {
					updateElementAttributes(item, inlineScript);
				}
				script.appendChild(inlineScript);
				target.appendChild(script);
			}
			source.removeChild(item);
		} else {
			var newNode = document.adoptNode(item);
			target.appendChild(newNode);
		}
	}
}

export {xhr, importNodes};