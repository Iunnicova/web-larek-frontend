import { IProductCard } from '../types';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Components';

interface IBasketCard extends IProductCard {
	index: number;
}

interface IBasketActions {
	onClick: (event: MouseEvent) => void;
}

export class CardBasket extends Component<IBasketCard> {
	protected _index: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, actions?: IBasketActions) {
		super(container);

		this._index = ensureElement<HTMLSpanElement>(
			'.basket__item-index',
			container
		);

		this._price = ensureElement<HTMLSpanElement>('.card__price', container);

		this._button = container.querySelector(`.card__button`);

		if (this._button) {
			this._button.addEventListener('click', (evt) => {
				this.container.remove();
				actions?.onClick(evt);
			});
		}
	}

	set index(value: number) {
		if (typeof value === 'number' && value >= 0) {
			this.setText(this._index, value.toString());
		}
	}

	set price(value: number) {
		if (typeof value === 'number' && value >= 0) {
			this.setText(this._price, value + ' синапсов');
		}
	}
}
