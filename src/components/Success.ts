import { IAction, ISuccess } from '../types';
import { ensureElement, formatNumber } from '../utils/utils';
import { Component } from './base/Components';

export class Success extends Component<ISuccess> {
	protected _description: HTMLElement;
	protected _button: HTMLElement;

	constructor(container: HTMLElement, actions: IAction) {
		super(container);

		this._button = ensureElement<HTMLElement>(
			'.order-success__close',
			container
		);
		this._description = ensureElement<HTMLElement>(
			'.order-success__description',
			container
		);

		if (actions?.onClick) {
			this._button.addEventListener('click', actions.onClick);
		}
	}

	//* Получяет и устанавлвает описания заказа
	set description(value: number) {
		if (this._description) {
			this.setText(
				this._description,
				`Списано ${formatNumber(value)} синапсов`
			);
		}
	}
}
