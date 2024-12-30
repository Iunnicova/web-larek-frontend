import { IOrder } from '../types';
import { IEvents } from './base/events';
import { Form } from './Form';

export class Order extends Form<IOrder> {
	protected _buttons: HTMLButtonElement[];

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._buttons = Array.from(container.querySelectorAll('.button_alt'));

		this._buttons.forEach((button) => {
			button.addEventListener('click', () => {
				events.emit('payment:changed', { target: button.name });
			});
		});
	}

	setButtonClass(name: string): void {
		this._buttons.forEach((button) => {
			button.classList.toggle('button_alt-active', button.name === name);
		});
	}

	set address(value: string) {
		const addressInput =
			this.container.querySelector<HTMLInputElement>('[name="address"]');
		if (addressInput) {
			addressInput.value = value;
		}
	}
}
