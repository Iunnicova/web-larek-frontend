//Класс представления показывает только то, что мы просили
//Класс Card создает разметку карточки и отвечает за все, что находится внутри карточки
import { IEvents } from '../types';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Components';


interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export interface ICard<T> {
	title: string;
	description?: string | string[];
	image: string;
	status: T;
}

export class Card<T> extends Component<ICard<T>> {
	
	protected element: HTMLElement;
	protected events: IEvents;
	protected cardCategory: HTMLElement;
	protected cardTitle: HTMLElement;
	protected cardDescription?: HTMLElement;
	protected cardImage: HTMLImageElement;
	protected cardPrice: HTMLElement;
	protected cardButton?: HTMLButtonElement;
	// protected basketButton: HTMLButtonElement;
	protected cardId: string;
	private _status: boolean;
	protected get status(): boolean {
		return this._status;
	}
	protected set status(value: boolean) {
		this._status = value;
	}
	container: any;
	setText: any;
	setImage: any;
	setPrice: any;

	constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions) {
			super(container);

			this.cardCategory = container.querySelector(`.${blockName}cardCategory`);
			this. cardTitle = ensureElement<HTMLElement>(`.${blockName} cardTitle`, container);
			this.cardDescription = container.querySelector(`.${blockName}cardDescription`);
			this.cardImage = ensureElement<HTMLImageElement>(`.${blockName}cardImage`, container);
			this.cardPrice = container.querySelector(`.${blockName}cardPrice`);
			this.cardButton = container.querySelector(`.${blockName}cardButton`);


			if (actions?.onClick) {
					if (this.cardButton) {
							this.cardButton.addEventListener('click', actions.onClick);
					} else {
							container.addEventListener('click', actions.onClick);
					}
			}
	}

	set id(value: string) {
			this.container.dataset.id = value;
	}

	get id(): string {
			return this.container.dataset.id || '';
	}

	set category(value: string) {
		this.setText(this.cardCategory, value);
	}

	get category(): string {
		return this.cardCategory.textContent || '';
	}

	set title(value: string) {
			this.setText(this.cardTitle, value);
	}

	get title(): string {
			return this.cardTitle.textContent || '';
	}

	set description(value: string | string[]) {
		if (Array.isArray(value)) {
				this.cardDescription.replaceWith(...value.map(str => {
						const descriptionTemplate = this.cardDescription.cloneNode() as HTMLElement;
						this.setText(descriptionTemplate, str);
						return descriptionTemplate;
				}));
		} else {
				this.setText(this.cardDescription, value);
		}
}

	set image(value: string) {
			this.setImage(this.cardImage, value, this.title)
	}

	get price(): string {
		return this.cardPrice.textContent || '';
}

set price(value: string) {
	if (value) {
				this.setText(this.cardPrice, `${value} синапсов`)
		} else {
				this.setText(this.cardPrice, `Бесценно`)
				this.setPrice(this.cardPrice, true);
		}
}
deleteCard() {
	this.container.remove();
	this.container = null;
}
}
	

