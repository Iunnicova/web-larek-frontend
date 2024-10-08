import { IEvents } from '../types';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Components';

interface IModalData {
	content: HTMLElement;
}

export class Modal extends Component<IModalData> {
	protected _content: HTMLElement;
	protected _closeButton: HTMLButtonElement;
	protected _checkoutButton: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._checkoutButton = container.querySelector('.card__button');
		this._closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);
		this._content = ensureElement<HTMLElement>('.modal__content', container);

		this.container.addEventListener('click', this.close.bind(this));
		this._content.addEventListener('click', (event) => event.stopPropagation());
		this._closeButton.addEventListener('click', this.close.bind(this));
	}

	// Cartoggle(state: boolean): void {
	// 	this.setDisabled(this._checkoutButton, state);
	// }

	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	open() {
		this.container.classList.add('modal_active');
		this.events.emit('userEdit:open');
	}

	close() {
		this.container.classList.remove('modal_active');
		this.content = null;
		this.events.emit('modal:close');
	}

	render(data: IModalData): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}
