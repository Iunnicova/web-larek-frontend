import { IAction, ICardData} from '../types';
import { ensureElement, formatNumber } from '../utils/utils';
import { Component } from './base/Components';

export class Card extends Component<ICardData> {
	protected _title: HTMLElement;
	protected _category?: HTMLSpanElement;
	protected _description?: HTMLElement;
	protected _button?: HTMLButtonElement;
	protected _image?: HTMLImageElement;
	protected _price: HTMLElement;

	constructor(container: HTMLElement, actions?: IAction) {
		super(container);

		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._description = container.querySelector('.card__text');
		this._category = container.querySelector('.card__category');
		this._button = container.querySelector('.card__button');
		this._image = container.querySelector('.card__image');
		this._price = ensureElement<HTMLElement>('.card__price', container);

		if (actions && typeof actions.onClick === 'function') {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				this.container.addEventListener('click', actions.onClick);
			}
		}
	}

	//*+Устанавливаем текст заголовка
	set title(value: string) {
		this.setText(this._title, value);
	}

	//*+Устанавливаем текст описания
	set description(value: string) {
		this.setText(this._description, value);
	}

	//*+ Устанавливаем категорию товара, удаляя предыдущие классы
	set category(value: string) {
		this.setText(this._category, value);

		//* Удаляем все текущие классы категории, чтобы не накладывать несколько одновременно
		this._category.classList.remove(
			'card__category_soft',
			'card__category_other',
			'card__category_hard',
			'card__category_additional',
			'card__category_button'
		);

		//* в дальнейшем  можем легко добавлять новые категории
		const categoryClasses: { [key: string]: string } = {
			'софт-скил': 'card__category_soft',
			другое: 'card__category_other',
			'хард-скил': 'card__category_hard',
			дополнительное: 'card__category_additional',
			кнопка: 'card__category_button',
		};

		//* добавляем текущую категорию к кнопке, если она есть в списке категорий
		const categoryClass = categoryClasses[value];
		if (categoryClass) {
			this._category.classList.add(categoryClass);
		} else {
			console.warn('Бесценно:', value);
		}
	}

	//*+Устанавливаем текст кнопки 
	set buttonLabel(productState: boolean) {
		if (productState) {
			this.setText(this._button, 'Убрать');
		} else {
			this.setText(this._button, 'Купить');
		}
	}

	//*+Устанавливаем изображение товара.
	set image(value: string) {
		this.setImage(this._image, value);
	}

	//*+Устанавливаем цену
	set price(value: number | null) {
		if (value === null) {
			this.setText(this._price, 'Бесценно');
			if (this._button) {
				this._button.disabled = true;
			}
		} else {
			this.setText(this._price, formatNumber(value) + ' синапсов');
			if (this._button) {
				this._button.disabled = false;
			}
		}
	}

	
}
