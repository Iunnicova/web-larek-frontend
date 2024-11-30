import { createElement, ensureElement, formatNumber } from '../utils/utils';
import { Component } from './base/Components';
import { EventEmitter, IEvents } from './base/events';

interface IBasketView {
	items: HTMLElement[];
	total: number;
	selected: string[];
}

export class Basket extends Component<IBasketView> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLElement;
	// items: any[];

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._button = this.container.querySelector('.basket__button');
		this._total = this.container.querySelector('.basket__price');

		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit('order:open');
			});
		}

		this.items = [];
	}

	//*метод устанавливает список товаров в корзине
	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
		}
	}

	//*метод управляет доступностью кнопки оформления заказа.
	set selected(items: string[]) {
		if (items.length) {
			this.setDisabled(this._button, false);
		} else {
			this.setDisabled(this._button, true);
		}
	}

	//* метод устанавливает текст элемента _total в форматированное значение общей стоимости
	set total(value: number) {
		const formattedValue = formatNumber(value) + ' синапсов';
    this.setText(this._total, formattedValue);
	}
}
