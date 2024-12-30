//*+ карточка товара
export interface IProductCard {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

// //*+ описание заказа
export interface ICardData extends IProductCard {
	buttonLabel: boolean;
	index: number;
}

//*+ структура заказа
export interface IOrder extends IFormOrder {
	payment: PaymentSelection;
}

//*+ статус товара в корзине
export interface ICommodityItem extends IProductCard {
	statusBasket: boolean;
}

//*+формы заказа
export interface IFormOrder {
	address: string;
	email: string;
	phone: string;
}

//*+ представление корзины
export interface IBasketView {
	selected: string[];
	items: HTMLElement[];
	total: number;
}

// //*+ действие при клике
export interface IAction {
	onClick: () => void;
}

//*+данныe приложения
export interface IAppData {
	products: ICommodityItem[];
	basket: ICommodityItem[];
	order: IOrder;
	payment: IPaymentModel;
}

//*+ ошибки валидации форм
export type ErrorForm = Partial<Record<keyof IOrder, string>>;

//*+хранит информацию о выбранном способе оплаты
export interface IPaymentModel {
	payment: string;
}

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

//*+API интерфейс магазина
export interface IApiShop {
	getListItem: () => Promise<IProductCard[]>;
	getItem: (id: string) => Promise<IProductCard>;
	orderGoods: (order: IOrder) => Promise<IOrderShop>;
}

//*+ модель заказа в магазине
export interface IOrderShop {
	id: string;
	total: number;
}

//*+ успешный результат
export interface ISuccess {
	description: number;
}

//*+ представление корзины
export type PaymentSelection = 'card' | 'cash';

//*+описание события
export interface IPaymentChangedEvent {
	target: string;
}
