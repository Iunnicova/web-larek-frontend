import { IFormOrder } from '../types';
import { IEvents } from './base/events';
import { Form } from './Form';

export interface IActions {
	onClick: (event: MouseEvent) => void;
}

export class Order extends Form<IFormOrder> {
	protected _buttonOnline: HTMLButtonElement;
	protected _buttonUponReceipt: HTMLButtonElement;
	protected _buttons: HTMLButtonElement[];

	constructor(container: HTMLFormElement, events: IEvents, actions?: IActions) {
		super(container, events);

		this._buttonUponReceipt = container.querySelector('button[name="cash"]');

		this._buttonOnline = container.querySelector('button[name="card"]');

		this._buttons = [this._buttonOnline, this._buttonUponReceipt];

		this._buttonUponReceipt.classList.add('button_alt-active');

		if (actions && actions.onClick) {
			this._buttonOnline.addEventListener('click', actions.onClick);
			this._buttonUponReceipt.addEventListener('click', actions.onClick);
		}
	}

	//*+ Деактивировать все кнопки и активировать выбранную
	selected(toggleButton: HTMLButtonElement) {
		this._buttons.forEach((button) => {
			button.classList.remove('button_alt-active');
		});
		toggleButton.classList.add('button_alt-active');
	}

	//*+ Установка адреса доставки
	address(value: string) {
		const addressInput = this.container.elements.namedItem('address');
		if (addressInput instanceof HTMLInputElement) {
			addressInput.value = value;
		} else {
			console.error('');
		}
	}
}
