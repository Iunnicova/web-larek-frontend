import { IFormState } from '../types';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Components';
import { IEvents } from './base/events';

export class Form<T> extends Component<IFormState> {
	protected form: HTMLFormElement;
	protected _submit: HTMLButtonElement;
	protected _errors: HTMLElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container);

		this._submit = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);
		this._errors = ensureElement<HTMLElement>('.form__errors', this.container);
		this.events = events;
		this.form = this.container as HTMLFormElement;

		this.container.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this.events.emit(`${this.container.name}:submit`);
		});

		this.container.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			this.onInputChange(field, value);
		});
	}

	//*метод который вызывается при изменении значения поля в форме
	protected onInputChange(field: keyof T, value: string) {
		this.events.emit(`${this.container.name}.${String(field)}:change`, {
			field,
			value,
		});
	}

	//*сеттер который устанавливает значение свойства errors
	set errors(value: string) {
		this.setText(this._errors, value);
	}

	//*сеттер который устанавливает значение свойства valid
	set valid(value: boolean) {
		this._submit.disabled = !value;
	}

	//* отображения ошибок
	private displayErrors(errors: string) {
		this.errors = errors;
	}

	//* отрисовывает форму с указанными свойствами
	render(state: Partial<T> & IFormState) {
		const { valid, errors, ...inputs } = state;
		super.render({ valid, errors });
		Object.assign(this, inputs);
		return this.container;
	}
}
