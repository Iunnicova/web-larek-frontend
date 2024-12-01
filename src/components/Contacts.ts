import { IFormOrder } from '../types';
import { IEvents } from './base/events';
import { Form } from './Form';

export class Contacts extends Form<IFormOrder> {
	protected _email: HTMLInputElement;
	protected _phone: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		// Инициализация элементов формы
		this._email = this.inputElement('email');
		this._phone = this.inputElement('phone');
	}

	private inputElement(name: string): HTMLInputElement {
		const input = this.container.elements.namedItem(name);
		if (!(input instanceof HTMLInputElement)) {
			throw new Error();
		}
		return input;
	}
}
