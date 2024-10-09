import { IEvents, IOrderForm } from '../types';
import { ensureAllElements } from '../utils/utils';
import { Form } from './Form';

export class Order extends Form<IOrderForm> {
	protected paymentButtons: HTMLButtonElement[];
	protected isValid: boolean;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this.paymentButtons = ensureAllElements<HTMLButtonElement>(
			'.button',
			container
		);

		this.paymentButtons.forEach((button) => {
			button.addEventListener('click', () => {
				this.selected(button.name);
				this.events.emit('order-profile:input', {
					field: 'payment',
					value: button.name,
				});
			});
		});
	}

	selected(name: string) {
		this.paymentButtons.forEach((button) => {
			this.setNextToggle(button, 'button', button.name === name);
		});
	}

	setNextToggle(button: HTMLButtonElement, className: string, state: boolean) {
		if (state) {
			button.classList.add(className);
		} else {
			button.classList.remove(className);
		}
		this.isValid = state;
	}
}
