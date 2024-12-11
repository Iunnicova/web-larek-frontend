export interface IAppData {
	products: ICommodityItem[];
	basket: ICommodityItem[];
	order: IOrder;
}

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

export interface IAction {
	onClick?: () => void;
}

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

export interface IModalData {
	content: HTMLElement;
}

export interface IFormState {
	valid: boolean;
	errors: string[];
}

export interface IFormOrder {
	payment: string;
	address: string;
	email: string;
	phone: string;
}

export interface IFormUser {
	id: string;
	title: string;
	price: number;
	address: string;
	email: string | number;
	phone: number;
}

export interface IEventEmitter {
	emit: (event: string, data: unknown) => void;
}

export interface IBasketView {
	items: HTMLElement[];
	total: number;
	selected: string[];
}

export interface IAppData {
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

export type ErrorForm = Partial<Record<keyof IOrder, string>>;

export interface IAApi {
	id: string;
	catalog: ICatalog[];
	basket: string[];
	preview: string;
	order: IOrder | null;
	loading: boolean;
}

export interface IOrderShop {
	id: string;
	total: number;
}

export interface IApiShop {
	getListItem: () => Promise<IProductCard[]>;
	getItem: (id: string) => Promise<IProductCard>;
	orderGoods: (order: IOrder) => Promise<IOrderShop>;
}

export interface IPageData {
	counter: number;
	_catalog: HTMLElement[];
	locked: boolean;
}

export interface ISuccess {
	description: number;
}

export interface ISuccesssAction {
	onClick: () => void;
}

export type ICatalog = IProductCard & IFormUser;

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export type Catalog = {
	catalog: Catalog[];
};
