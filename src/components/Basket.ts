import { IBasket } from '../types';
import '../index';
import { EventEmitter } from './base/events';
import { createElement, ensureElement } from '../utils/utils';
import { Component } from './base/Components';

export class Basket extends Component<IBasket> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLElement;
	protected _price: HTMLElement;
	protected _itemIndex: HTMLElement;
	protected container: any;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._price = this.container.querySelector('.basket__price');
		this._button = this.container.querySelector('.basket__button');
		this._itemIndex = this.container.querySelector('.basket__item-index');

		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit('basket:change');
			});
		}

		this.items = [];
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Ваша Корзина пуста!',
				})
			);
		}
	}

	set price(data: number) {
		this.setText(this._price, data + 'cинапсов');
	}

	set selected(items: string[]) {
		if (items.length) {
			this.setDisabled(this._button, false);
		} else {
			this.setDisabled(this._button, true);
		}
	}
}
