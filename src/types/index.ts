//*+ карточка товара
export interface IProductCard {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface ICardData extends IProductCard {
	buttonLabel: boolean;
	index?: number;
}

//*+ описание заказ
export interface IOrder {
	payment: string;
	email: string;
	phone: string;
	address: string;
}

//*+ есть товар в корзине или нет
export interface ICommodityItem extends IProductCard {
	statusBasket: boolean;
}

//*+формы заказа
export interface IFormOrder {
	payment: string;
	address: string;
	email: string;
	phone: string;
}

//*+ кoрзина
export interface IBasketView {
	selected: string[];
	items: HTMLElement[];
	total: number;
}

//*+ будет вызвано при клике
export interface IAction {
	onClick: () => void;
}

//*+данныe приложения для хранения
export interface IAppData {
	products: ICommodityItem[];
	basket: ICommodityItem[];
	order: IOrder;
	payment: IPaymentModel;
}

//*+хранит информацию о выбранном способе оплаты
export interface IPaymentModel {
	payment: string;
}

//*+ ошибки валидации форм
export type ErrorForm = Partial<Record<keyof IOrder, string>>;

//*+ состояние формы
export interface IFormState {
	valid: boolean;
	errors: string[];
}

//*+данные для модального окна
export interface IModalData {
	content: HTMLElement;
}

//*+ данные страницы
export interface IPageData {
	counter: number;
	_catalog: HTMLElement[];
	locked: boolean;
}

//*+ интерфейс API магазина
export interface IApiShop {
	getListItem: () => Promise<IProductCard[]>;
	getItem: (id: string) => Promise<IProductCard>;
	orderGoods: (order: IOrder) => Promise<IOrderShop>;
}

//*+ интерфейс для API заказа
export interface IOrderShop {
	id: string;
	total: number;
}

//*+ успешный результат
export interface ISuccess {
	description: number;
}
