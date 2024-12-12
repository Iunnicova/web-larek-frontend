import { IModalData } from '../types';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Components';
import { IEvents } from './base/events';

export class Modal extends Component<IModalData> {
	protected _button: HTMLButtonElement;
	protected _content: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._button = ensureElement<HTMLButtonElement>('.modal__close', container);
		this._content = ensureElement<HTMLElement>('.modal__content', container);

		this._button.addEventListener('click', this.close.bind(this));

		this.container.addEventListener('click', this.close.bind(this));

		this._content.addEventListener('click', (event) => event.stopPropagation());
	}

	//*+Устанавливает новое содержимое модального окна
	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	//*+делает модальное окно видимым
	open() {
		this.container.classList.add('modal_active');
		this.events.emit('modal:open');
	}

	//*+освобождает содержимое
	close() {
		this.container.classList.remove('modal_active');
		this.content = null;
		this.events.emit('modal:close');
	}

	//*+рендерит содержимое
	render(data: IModalData): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}
