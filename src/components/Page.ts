import { IPageData } from '../types';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Components';
import { IEvents } from './base/events';

export class Page extends Component<IPageData> {
	protected _gallery: HTMLElement;
	protected _wrapper: HTMLElement;
	protected _counter: HTMLElement;
	protected _locked: boolean;
	protected _basketCounter: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._counter = ensureElement<HTMLElement>('.header__basket-counter');
		this._gallery = ensureElement<HTMLElement>('.gallery');
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
		this._basketCounter = ensureElement<HTMLElement>('.header__basket');

		this._basketCounter.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}

	//*+Устанавливает текстовое значение в элемент и, преобразуя его в строку.
	set counter(value: number) {
		this.setText(this._counter, String(value));
	}

	//*+Заменяет на массив элементов, переданных в качестве аргумента.
	set gallery(items: HTMLElement[]) {
		this._gallery.replaceChildren(...items);
	}

	//*+Добавляет или удаляет класс 
	set locked(value: boolean) {
		if (value === true) {
			this._wrapper.classList.add('page__wrapper_locked');
		} else {
			this._wrapper.classList.remove('page__wrapper_locked');
		}
	}
}
