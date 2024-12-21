import { IAction } from '../types';
import { ensureElement } from '../utils/utils';
import { Card } from './Card';

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
