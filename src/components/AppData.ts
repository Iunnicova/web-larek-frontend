import {
	IProductCard,
	ICommodityItem,
	IOrder,
	IFormOrder,
	ErrorForm,
	paymentSelection,
} from '../types';
import { Model } from './base/Model';

export class AppData extends Model<IFormOrder> {
	protected goods: ICommodityItem[];
	order: IOrder = {
		payment: null,
		address: '',
		email: '',
		phone: '',
	};
	errorForm: ErrorForm = {};
	preview: string | null;
	orderForm: unknown;

	//*+устанавливаем идентификатор, который генерирует событие изменения
	setViewing(item: ICommodityItem) {
		this.preview = item.id;
		this.emitChanges('viewing:changed', item);
	}

	//*+устанавливаем каталог товаров
	setCatalog(items: IProductCard[]): void {
		this.goods = items.map((item) => ({ ...item, statusBasket: false }));
		this.emitChanges('catalog:changed');
	}

	//*+обновляем корзину товаров
	updateBasket() {
		const basketItems = this.goods.filter((item) => item.statusBasket);
		this.events.emit('basket:changed', basketItems);
	}

	//*+возвращаем массив товаров.
	getCatalog(): ICommodityItem[] {
		return this.goods;
	}

	//*+возвращаем объект заказа
	getOrder() {
		return {
			...this.order,
			total: this.getTotal(),
			items: this.getGoodsBasket().map((item) => item.id),
		};
	}

	//*+добавляем товар в корзину
	inBasket(item: ICommodityItem) {
		const index = this.goods.findIndex((product) => product.id === item.id);
		if (index !== -1) {
			this.goods[index].statusBasket = true;
		}
	}

	//*+удаляем товар из корзину
	fromBasket(item: ICommodityItem) {
		const index = this.goods.findIndex((product) => product.id === item.id);
		if (index !== -1) {
			this.goods[index].statusBasket = false;
			this.updateBasket();
		}
	}

	//*+ возвращаем общую стоимость товаров в корзине
	getTotal() {
		return this.goods.reduce((a, c) => {
			if (c.statusBasket) {
				return a + c.price;
			}
			return a;
		}, 0);
	}

	//*+ устанавливает выбранный способ оплаты заказа и валидирует
	orderPaymentMethod(value: paymentSelection) {
		this.order.payment = value;

		if (this.validateOrder()) {
			this.events.emit('order:ready', this.order);
		}
	}

	//*+ возвращаем массив товаров в корзине
	getGoodsBasket(): ICommodityItem[] {
		if (!Array.isArray(this.goods)) {
			return [];
		}
		return this.goods.filter((item) => item.statusBasket);
	}

	// *+ очищаем корзину
	clearBasket() {
		this.goods.forEach((item) => (item.statusBasket = false));
		this.order = {
			address: '',
			email: '',
			phone: '',
			payment: null,
		};
	}

	//*+ устанавливает значение указанного поля контактной информации заказа и валидирует заказ после этого.
	choosePaymentMethod(field: keyof IFormOrder, value: string) {
		this.order[field] = value;
		this.validateOrder();
	}

	//*+устанавливаем поле заказа
	setOrderField(field: keyof IFormOrder, value: string) {
		this.order[field] = value;
		this.validateOrder();
	}

	//*+ проверяем форму заказа на ошибки
	validateOrder() {
		const errors: typeof this.errorForm = {};
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

		this.errorForm = errors;
		this.events.emit('errorForm:change', this.errorForm);
		return Object.keys(errors).length === 0;
	}
}
