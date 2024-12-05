export interface IAppSateData {
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

export type ErrorForm = Partial<Record<keyof IOrder, string>>;

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
