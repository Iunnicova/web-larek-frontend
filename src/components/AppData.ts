import {
	IAppSateData,
	IProductCard,
	ICommodityItem,
	IOrder,
	//PaymentType,
	ErrorForm,
	IFormOrder,
} from '../types';
import { Model } from './base/Model';

export class AppState extends Model<IAppSateData> {
	protected goods: ICommodityItem[];
	protected basket: ICommodityItem[];
	protected order: IOrder = {
		payment: '',
		address: '',
		email: '',
		phone: '',
		items: [],
		total: 0,
	};
	errorForm: ErrorForm = {};
	preview: string | null;
	orderForm: unknown;

	//*Генерирует событие «preview:changed» с указанным элементом.*
	// setPreviewCard(item: ICommodityItem) {
	// 	this.emitChanges('preview:changed', item);
	// }
	setViewing(item: ICommodityItem) {
		this.preview = item.id;
		this.emitChanges('viewing:changed', item);
	}

	//**принимает массив товаров (item) и обновляет каталог*
	// setProduct(items: IProduct[]) {
	// 	this.products = items.map((item) => ({
	// 		...item,
	// 		basketState: false,
	// 	}));
	// 	this.emitChanges('gallery:changed', { products: this.products });
	// }

	setCatalog(items: IProductCard[]): void {
		this.goods = items.map((item) => ({ ...item, statusBasket: false }));
		this.emitChanges('catalog:changed');
	}

	//*метод обновления корзины. Фильтрует массив
	updateBasket() {
		this.basket = this.goods.filter((item) => item.statusBasket);
		this.events.emit('basket:changed', this.basket);
	}
	//**Возвращает текущий список продуктов.*
	// getProducts(): IProductItem[] {
	// 	return this.goods;
	// }
	getCatalog(): ICommodityItem[] {
		return this.goods;
	}

	//*Обновляет общую стоимость заказа и список товаров из корзины и возвращает обновленный заказ.*
	// getOrder(): IOrder {
	// 	this.order.total = this.getTotal();
	// 	this.order.items = this.getGoodsBasket().map(item => item.id);
	// 	return this.order;
	// }

	getOrder(): IOrder {
		this.order.total = this.getTotal();
		const goodsBasket = this.getGoodsBasket();

		if (!Array.isArray(goodsBasket)) {
			this.order.items = [];
		} else {
			this.order.items = goodsBasket.map((item) => item.id);
		}

		return { ...this.order };
	}

	//*Отмечает товар как добавленный в корзину, устанавливая его basket на true.
	// addToBasket(item: ICommodityItem) {
	// 	this.goods.find(product => item.id === product.id).statusBasket = true;
	// }
	inBasket(item: ICommodityItem) {
		const index = this.goods.findIndex((product) => product.id === item.id);
		if (index !== -1) {
			this.goods[index].statusBasket = true;
		}
	}
	//*Отмечает товар как удаленный из корзины, устанавливая его basket false.
	// FromBasket(item: ICommodityItem) {
	// 	this.goods.find(product => item.id === product.id).statusBasket = false;
	// }
	FromBasket(item: ICommodityItem) {
		const index = this.goods.findIndex((product) => product.id === item.id);
		if (index !== -1) {
			this.goods[index].statusBasket = false;
			this.updateBasket();
		}
	}
	//* Рассчитывает и возвращает общую стоимость всех товаров в корзине.*
	// getTotal(): number {
	// 	return this.basket.reduce((accum, currentValue) => {
	// 		return accum + currentValue.price;
	// 	}, 0);
	// }

	getTotal() {
		return this.basket.reduce((a, c) => {
			if (c.statusBasket) {
				return a + c.price;
			}
			return a;
		}, 0);
	}

	//* Фильтрует и возвращает товары, отмеченные как добавленные в корзину.
	// getBasketItems(): ICommodityItem[] {
	// 	this.basket = this.goods.filter((item) => {
	// 		return item.statusBasket === true;
	// 	});

	// 	return this.basket;
	// }

	getGoodsBasket(): ICommodityItem[] {
		// Проверка, является ли this.goods массивом
		if (!Array.isArray(this.goods)) {
			return [];
		}
		this.basket = this.goods.filter((item) => item.statusBasket);

		return this.basket;
	}

	// * меняет состояние товара в корзине
	// clearBasket() {
	// 	this.basket.forEach((item) => {
	// 		item.statusBasket = false;
	// 	});
	// }

	clearBasket() {
		this.basket.forEach((item) => (item.statusBasket = false));
	}

	//*  Устанавливает определенное поле формы заказа и проверяет заказ.
	// setOrderField(field: keyof (IFormOrder), value: string) {
	// 	this.order[field] = value;
	// 	this.validateOrder();
	// }

	setOrderField(field: keyof IFormOrder, value: string) {
		this.order[field] = value;

		if (this.validateOrder()) {
			this.events.emit('order:ready', this.order);
		}
	}

	// * Проверяет каждое поле формы заказа, обновляет formErrorsобъект, генерирует событие «formErrors:change» и возвращает логическое значение, указывающее, действительна ли форма.
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