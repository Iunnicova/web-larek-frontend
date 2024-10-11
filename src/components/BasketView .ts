// Отображение отдельного товара в корзине

import { IEventEmitter } from '../types';

//+ Интерфейс для конструктора
//на входе контейнер, в него будем выводить
export interface IViewConstructor {
	new (container: HTMLElement, events?: IEventEmitter): IView;
}
//+Интерфейс для класса отображения
//устанавливаем данные, возвращаем контейнер
interface IView {
	render(data?: object): HTMLElement;
}

export class BasketItemView implements IView {
	//элементы внутри контейнера
	protected title: HTMLSpanElement;
	protected addButton: HTMLButtonElement;
	protected removeButton: HTMLButtonElement;

	//Сохранение данных на будующее
	protected id: string | null = null;

	constructor(
		protected container: HTMLElement,
		protected events: IEventEmitter
	) {
		// инициализируем, чтобы не искать повторно
		this.title = container.querySelector(
			'.basket-item__title'
		) as HTMLSpanElement;
		this.addButton = container.querySelector(
			'.basket-item__add'
		) as HTMLButtonElement;
		this.removeButton = container.querySelector(
			'.basket-item__remove'
		) as HTMLButtonElement;

		//устанавливаем события
		this.addButton.addEventListener('click', () => {
			//генерируем событие в нашем брокере
			this.events.emit('ui:basket-add', { id: this.id });
		});

		this.addButton.addEventListener('click', () => {
			//генерируем событие в нашем брокере
			this.events.emit('ui:basket-remove', { id: this.id });
		});
	}

	//генерирует новую разметку которую возвращает из компанента
	render(data: { id: string; title: string }) {
		if (data) {
			//если есть новые данные, то запомним их
			this.id = data.id;
			// выводим в интерфейс
			this.title.textContent = data.title;
		}
		return this.container;
	}
}

//*Вся корзина целиком, задача корзины отображать, то что ей поступает
export class BasketView implements IView {
	constructor(protected container: HTMLElement) {}
	render(data: { items: HTMLElement[] }) {
		if (data) {
			this.container.replaceChildren(...data.items);
		}
		return this.container;
	}
}
