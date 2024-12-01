import { IFormOrder } from '../types';
import { ensureAllElements } from '../utils/utils';
import { IEvents } from './base/events';
import { Form } from './Form';

export class Order extends Form<IFormOrder> {
	protected _paymentButtons: HTMLButtonElement[];
	protected _addressInput: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		//находит элемент с именем "address" в контейнере и проверяет, является ли он HTML-элементом input. Если нет, генерируется ошибка.
		const addressElement = container.elements.namedItem('address');
		if (!(addressElement instanceof HTMLInputElement)) {
			throw new Error('mistake');
		}
		this._addressInput = addressElement;

		this._paymentButtons = ensureAllElements<HTMLButtonElement>(
			'.button_alt',
			container
		);

		//проверяет есть ли у кнопки свойство name
		this._paymentButtons.forEach((button) => {
			if (!button.name) {
				console.warn(button);
				return;
			}

			//добавляет обработчик клика на каждую кнопку платежа
			button.addEventListener('click', () => {
				this.selected(button.name);
				this.events.emit(`${this.form.name}.payment:change`, {
					field: 'payment',
					value: button.name,
				});
			});
		});
	}

	//устанавливает адрес в поле ввода адреса
	set address(value: string) {
		this._addressInput.value = value;
	}

	//выбирает кнопку платежа по имени и добавляет или удаляет класс на кнопке
	selected(name: string): void {
		this._paymentButtons.forEach((button) => {
			if (button.name && typeof button.name === 'string') {
				this.toggleClass(button, 'button-works', button.name === name);
			}
		});
	}
}
