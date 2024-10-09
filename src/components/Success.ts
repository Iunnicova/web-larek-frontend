import { ensureElement } from '../utils/utils';
import { Component } from './base/Components';

interface ISuccess {
	total: number;
	onClick: () => void;
}

export class Success extends Component<ISuccess> {
	protected _close: HTMLElement;
	protected _writtenOffSynapses: HTMLElement;

	constructor(container: HTMLElement, actions: ISuccess) {
		super(container);

		this._close = ensureElement<HTMLElement>(
			'.order-success__close',
			this.container
		);

		this._writtenOffSynapses = ensureElement<HTMLParagraphElement>(
			'.order-success__description',
			this.container
		);

		if (actions?.onClick) {
			this._close.addEventListener('click', actions.onClick);
		}
	}

	set writtenOffSynapses(value: number) {
		this.setText(this._writtenOffSynapses, `Списано ${value} синапсов`);
	}
}
