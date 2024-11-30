import { ensureElement, formatNumber } from '../utils/utils';
import { Component } from './base/Components';

interface ISuccess {
	description: number;
}

interface ISuccesssAction {
	onClick: () => void;
}

export class Success extends Component<ISuccess> {
	protected _description: HTMLElement;
	protected _button: HTMLElement;

	constructor(container: HTMLElement, actions: ISuccesssAction) {
		super(container);

		// Получаем необходимые элементы из контейнера и выполняем проверку
		this._button = ensureElement<HTMLElement>(
			'.order-success__close',
			container
		);
		this._description = ensureElement<HTMLElement>(
			'.order-success__description',
			container
		);

		// Присваиваем обработчик клика на кнопку, если он существует
		if (actions?.onClick) {
			this._button.addEventListener('click', actions.onClick);
		}
	}

	// Получение и установка описания заказа
	set description(value: number) {
		if (this._description) {
			this.setText(
				this._description,
				`Списано ${formatNumber(value)} синапсов`
			);
		}
	}
}
