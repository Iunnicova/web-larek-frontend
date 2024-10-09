import { IEvents } from '../types';
import { Component } from './base/Components';
import { ensureElement } from '../utils/utils';

interface IPage {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
}

export class Page extends Component<IPage> {
	protected _wrapper: HTMLElement;
	protected _counterBasket: HTMLElement;
	protected _basket: HTMLElement;
	protected _catalog: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
		this._counterBasket = ensureElement<HTMLElement>('.header__basket-counter');
		this._basket = ensureElement<HTMLElement>('.header__basket');
		this._catalog = ensureElement<HTMLElement>('.gallery__item');

		this._basket.addEventListener('click', () => {
			this.events.emit('basket:change');
		});
	}

	set counter(value: number) {
		this.setText(this._counterBasket, String(value));
	}

	set catalog(items: HTMLElement[]) {
		this._catalog.replaceChildren(...items);
	}

	set locked(value: boolean) {
		if (value) {
			this._wrapper.classList.add('page__wrapper');
		} else {
			this._wrapper.classList.remove('page__wrapper');
		}
	}
}
