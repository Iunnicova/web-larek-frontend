import { IEvents, IFormContacts } from '../types';
import { Form } from './Form';

export class Contacts extends Form<IFormContacts> {
	protected _email: HTMLInputElement;
	protected _phone: HTMLInputElement;
	protected _address: HTMLInputElement[];
	protected _form: HTMLFormElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._form = container;
		this._email = this._form.elements.namedItem(
			'еmail-contacts:validation'
		) as HTMLInputElement;
		this._phone = this._form.elements.namedItem(
			'phone-contacts:input'
		) as HTMLInputElement;
		this._address = Array.from(
			this._form.elements.namedItem(
				'address-profile:input'
			) as unknown as NodeListOf<HTMLInputElement>
		);
	}

	set email(value: string) {
		this._email.value = value;
	}

	set phone(value: string) {
		this._phone.value = value;
	}

	set address(value: string[]) {
		value.forEach((val, index) => {
			if (index < this._address.length) {
				this._address[index].value = val;
			}
		});
	}

	get address(): string[] {
		return this._address.map((input) => input.value);
	}

	extToggle(state: boolean) {
		this.valid = state;
	}
}
