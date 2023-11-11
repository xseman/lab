import { html, LitElement } from "lit";
import { customElement, state } from 'lit/decorators.js';

declare global {
	interface HTMLElementTagNameMap {
		"text-input": TextInput
	}
}

@customElement('text-input')
export class TextInput extends LitElement {
	@state()
	private _text = "Write something"

	render() {
		return html`
			<p>
				<label>
					<input
						type="text"
						@input=${this.handleInput}
					/>
					<p>${this._text}</p>
				</label>
			</p>
    	`;
	}

	private handleInput(e: Event): void {
		this._text = (e.target as HTMLInputElement).value
	}
}
