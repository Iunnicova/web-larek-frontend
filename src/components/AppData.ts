import {
	IProductCard,
	ICommodityItem,
	IOrder,
	IFormOrder,
	ErrorForm,
	IPaymentModel,
} from '../types';
import { Model } from './base/Model';

export class AppData extends Model<IPaymentModel> {
	protected goods: ICommodityItem[];
	protected basket: ICommodityItem[];
	order: IOrder = {
		payment: '',
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
		this.basket = this.goods.filter((item) => item.statusBasket);
		this.events.emit('basket:changed', this.basket);
	}

	//*+возвращаем массив товаров.
	getCatalog(): ICommodityItem[] {
		return this.goods;
	}

	//*+возвращаем объект заказа
	getOrder(): IOrder {
		const total = this.getTotal();
		const goodsBasket = this.getGoodsBasket();

		let items: string[] = [];
		if (Array.isArray(goodsBasket)) {
			items = goodsBasket.map((item) => item.id);
		}

		const order = {
			...this.order,
			total,
			items,
		};

		return order;
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
		return this.basket.reduce((a, c) => {
			if (c.statusBasket) {
				return a + c.price;
			}
			return a;
		}, 0);
	}

	//*+ возвращаем массив товаров в корзине
	getGoodsBasket(): ICommodityItem[] {
		if (!Array.isArray(this.goods)) {
			return [];
		}
		this.basket = this.goods.filter((item) => item.statusBasket);

		return this.basket;
	}

	// *+ очищаем корзину
	clearBasket() {
		this.basket.forEach((item) => (item.statusBasket = false));
	}

	//*+устанавливаем поле заказа
	setOrderField(field: keyof IFormOrder, value: string) {
		this.order[field] = value;

		if (this.validateOrder()) {
			this.events.emit('order:ready', this.order);
		}
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
