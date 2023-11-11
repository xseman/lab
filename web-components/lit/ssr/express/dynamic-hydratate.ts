const clickMeEl = document.querySelector('click-me')

function hydratate() {
	import('./click-me.js');
	console.log("Mouse entered and Element hydrated!");
}

if (clickMeEl) {
	clickMeEl.addEventListener(
		'mouseenter',
		hydratate,
		{ once: true }
	);
}

export {}
