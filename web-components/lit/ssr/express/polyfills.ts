// https://caniuse.com/mdn-html_elements_template_shadowroot
if (!HTMLTemplateElement.prototype.hasOwnProperty('shadowRoot')) {
	const { hydrateShadowRoots } = await import("@webcomponents/template-shadowroot/template-shadowroot.js");
	hydrateShadowRoots(document.body);
}

import "@lit-labs/ssr-client/lit-element-hydrate-support.js"

// module
export {}
