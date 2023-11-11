import { html, isServer, LitElement } from "lit";
import { customElement, state } from 'lit/decorators.js';

declare global {
	interface HTMLElementTagNameMap {
		"click-me": ClickMe
	}
}

@customElement('click-me')
export class ClickMe extends LitElement {

	@state()
	private _count: number = 0;

	constructor() {
		super();

		if (isServer) {
			console.log("Hello from server");
		} else {
			console.log("Hello from web");
			// TypeError if it's rendered on server
			this.addEventListener(
				'mouseenter',
				(_) => console.log("Element event listener fired!"),
				{ once: true }
			);
		}
	}

	private handleClick() {
		this._count++;
	}

	render() {
		return html`
			<p>Click count: ${this._count}</p>
			<button @click=${this.handleClick}>Click me!</button>
    	`;
	}
}


