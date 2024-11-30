////Катротчка товара

export interface IAppSateData {
	products: ICommodityItem[];
	basket: ICommodityItem[];
	order: IOrder;
}


// карточки товара
export interface IProductCard {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

// формы
export interface IOrder {
	id?: string;
	payment: string;
	title?: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	price?: number;
	items: string[];
}

export interface ICommodityItem extends IProductCard {
	statusBasket: boolean;
}

export interface IFormOrder{
	payment: string;
	address: string;
	email: string;
	phone: string;
}

///////////******+++++++++++++++++++++ */

//Интерфейс карточки товара

// export interface IProductCard {
// 	id: string;
// 	description?: string | string[];
// 	image: string;
// 	title: string;
// 	category: string;
// 	price: number;
// }

//Интерфейс формы

export interface IFormUser {
	id: string;
	title: string;
	price: number;
	address: string;
	email: string | number;
	phone: number;
}

// Интерфейс для хранения всех карточек

////Корзина

export interface IEventEmitter {
	emit: (event: string, data: unknown) => void;
}

export interface IAppSateData {
	products: ICommodityItem[];
	basket: ICommodityItem[];
	order: IOrder;
}

export interface ICommodityItem extends IProductCard {
	statusBasket: boolean;
}

export interface IFormOrder {
	payment: string;
	address: string;
	email: string;
	phone: string;
}

//заказ

// export interface IOrder {
// 	order: IOrder;
// 	id?: string;
// 	products?: IProductCard[];
// 	address: string;
// 	email: string;
// 	phone: '';
// 	items?: string[];
// 	payment: string;
// 	result: number;
// 	size: number;
// 	total?: number;
// }

//ErrorForm - представляет объект с ключами. Partial - объект может иметь не все ключи из IOrder.
export type ErrorForm = Partial<Record<keyof IOrder, string>>;

//API

export interface IAApi {
	id: string;
	catalog: ICatalog[];
	basket: string[];
	preview: string;
	order: IOrder | null;
	loading: boolean;
}

export type ICatalog = IProductCard & IFormUser;

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export type Catalog = {
	catalog: Catalog[];
};

// //используем утилиту Pick - выбирает указанные свойства из типа/интерфейса

// //Модальное окно формы оплаты
// export type TModalPayment = Pick<IProductUser, 'address' | 'title' | 'price'>;

// //Модальное окно форма контактов
// export type TModalContact = Pick<IProductUser, 'email' | 'phone'>;

// // Модальное окно успешной покупки
// export type TModalSuccessPurchase = Pick<IProductCard, 'title' | 'price'>;
