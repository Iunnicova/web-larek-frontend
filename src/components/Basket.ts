import { IAction, IBasketView } from '../types';
import { createElement, ensureElement, formatNumber } from '../utils/utils';
import { Component } from './base/Components';
import { EventEmitter } from './base/events';
import { Card } from './Cards';

export class Basket extends Component<IBasketView> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLElement;

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

	//* устанавливает список товаров в корзине
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

	//* управляет доступностью кнопки оформления заказа.
	set selected(items: string[]) {
		if (items.length) {
			this.setDisabled(this._button, false);
		} else {
			this.setDisabled(this._button, true);
		}
	}

	//* устанавливает текст элемента _total в форматированное значение общей стоимости
	set total(value: number) {
		const formattedValue = formatNumber(value) + ' синапсов';
		this.setText(this._total, formattedValue);
	}
}

//*проверяет найден ли элемент, и если нет, выводит ошибку в консоль.
export class CardBasket extends Card {
	protected _index: HTMLElement;

	constructor(container: HTMLElement, actions: IAction) {
		super(container, actions);

		this._index = ensureElement<HTMLSpanElement>(
			'.basket__item-index',
			container
		);
	}

	set index(value: number) {
		if (typeof value === 'number' && value >= 0) {
			this.setText(this._index, value.toString());
		}
	}
}
