import {
	FormErrors,
	IAppState,
	IOrder,
	IOrderForm,
	// IOrdering,
} from '../types';
import { Model } from './base/Model';

 interface IOrdering {
	price: string | number;
	clearBid(): unknown;
	isParticipate: boolean;
	CLots: boolean;
	items: string[];
	reduce: boolean;
	payment: string;
	total: 0;
	address: string;
	email: string;
	phone: string;
	_id?: string;
	title: string;
	image: string;
	category: string;
	status: boolean;
	about: string;
	item: string;
}

export type CatalogChangeEvent = {
	catalog: IOrdering[];
};

export class AppState extends Model<IAppState> {
	basket: string[];
	catalog: IOrdering[];
	loading: boolean;
	products: IOrdering[];
	order: IOrder = {
		email: '',
		phone: '',
		items: [],
		payment: '',
		address: '',
		total: 0,
		itemId: [],
		clearBid: function (): unknown {
			throw new Error('Function not implemented.');
		},
		// price: undefined,
		price: undefined,
		isParticipate: false,
		status: '',
		CLots: false,
		reduce: false,
		order: undefined
	};
	preview: string | null;
	formErrors: FormErrors = {};
	updateBasket: any;

	toggleOrderedLot(id: string, isIncluded: boolean) {
		if (isIncluded) {
			this.order.items = [...this.order.items, id];
		} else {
			this.order.items = this.order.items.filter((itemId) => itemId !== id);
		}
	}

	addToBasket(item: string) {
		this.basket.push(item);
		this.updateBasket();
	}

	clearBasket() {
		this.order.items.forEach((id) => {
			this.toggleOrderedLot(id, false);
			this.catalog.find((it) => it._id === id).clearBid();
		});
	}

	//рассчитать общую стоимость товаров в заказе
	getTotal() {
    return this.order.items.reduce((total, itemId) => {
        const item = this.catalog.find((it) => it._id === itemId);
        return total + (item ? Number(item.price) : 0);
    }, 0);
}

	setCatalog(items: IOrdering[]): void {
		this.catalog = items;
		this.emitChanges('catalogUpdated', items);
	}

	setPreview(item: IOrdering) {
		this.preview = item._id;
		this.emitChanges('preview:changed', item);
	}

	getActiv(): IOrdering[] {
		return this.catalog.filter(
			(item) => item.status === 'active' && item.isParticipate
		);
	}

	getClosedLots(): IOrdering[] {
		return this.catalog.filter(lot => lot.isClosed);
	}

	setOrderField(field: keyof IOrderForm, value: string): void {
		this.order[field] = value;
		this.validateOrder();
}

	validateOrder() {
		const errors: typeof this.formErrors = {};
		if (!this.order.payment) {
			errors.payment = 'Необходимо выбрать способ оплаты';
		}
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес доставки';
		}
		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}

		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	// Подготовка заказа
	getOrder(): IOrderForm {
		return this.order;
}

// Реализация получения элементов корзины
getBasketItems(): string[] {
	try {
			return this.basket;
	} catch (error) {
			console.error("Failed to get basket items:", error);
			return [];
	}
}


}