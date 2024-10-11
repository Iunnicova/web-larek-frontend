// import { IProductCard } from './index';


import { ApiPostMethods } from '../components/base/api';

export interface IProductCard {
	_id: string;
	name?: string;
	description: string;
	category: string;
	image: string;
	title: string;
	price: number | null;
}

export interface IUser {
	clearBid: unknown;
	status: string;
	_id: string;
	payment?: string;
	total?: number;
	items?: string;
	address: string;
	email: string | number;
	phone: number;
}

export interface IEventEmitter {
	emit: (event: string, data: unknown) => void;
}

export interface IProduct {
	image: string;
	id: string;
	title: string;
	name?: string;
	price?: number;
	items?: string;
}

export interface IEvents {
	// url: string;
	// total: number;
	emit: (event: string, data?: unknown) => void;
}

export interface IBasket {
	forEach(arg0: (item: { basketState: boolean }) => void): unknown;
	_items: Map<string, number>;
	_add(id: string): void;
	_total: number;
	_remove(id: string): void;
	_id?: string;
	_data?: string;
}

export type TModalData = {
	content: HTMLElement;
};

export interface IViewModel {
	content: HTMLElement;
	open(): void;
	close(): void;
	toggleButton(state: boolean): void;
	render(data: TModalData): HTMLElement;
}

export interface IFormContacts {
	address: string;
	email: string | number;
	phone: number;
}

export interface ICatalogModel {
	items: IProduct[];
	setItems(items: IProduct[]): void;
	getProduct(id: string): IProduct;
}

export interface ICard {

	likes: unknown;
	title: string;
	description?: string | string[];
	image: string;
	emit?: boolean;
	status: boolean;
	_id?: string;
}

//Интерфейс Модели для хранения данных товара
export interface ICatalogModel {
	items: IProduct[];
	setItems(items: IProduct[]): void;
	getProduct(id: string): IProduct;
}

export interface CApp {
	catalog: IUser[];
	basket: string[];
	loading: boolean;
	preview: string | null;
	order: number,
}

export interface IOrderForm {
	
	price: unknown;
	clearBid(): unknown;
	isParticipate: boolean;
	status: string;
	CLots: boolean;
	items: string[];
	reduce: boolean;
	payment: string;
	total: 0;
	address: string;
	email: string;
	phone: string;
	_id?: string;
}

export interface IOrdering {
	basketState: boolean;
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

export interface IOrder extends IOrderForm {
	items: string[];
	payment: string;
	address: string;
	email: string;
	phone: string;
	total: 0;
	itemId: [];
	order: IOrdering | IOrder
}

export interface IPage {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
}

export interface ISuccess {
	total: number;
	onClick: () => void;
}

export interface IApiShop {
	getList: () => Promise<IProduct[]>;
	getItem: (id: string) => Promise<IProduct>;
	orderProduct: (order: IOrder) => Promise<IOrderForm>;
	get: (uri: string) => Promise<object>;
	post: (uri: string, data: object, method: ApiPostMethods) => Promise<object>;
	url: URL;
	options: Request;
	cdnUrl: string;
}

export interface IAppState {
	catalog: IOrderForm[];
	basket: string[];
	preview: string | null;
	order: IOrder | null;
	loading: boolean;
	// payment: string;
	total: 0;
	_id: string;
}

// Интерфейс отображение компонентов
// //+Интерфейс для класса отображения
export interface IView {
	render(data?: object): HTMLElement;
	id?: string;
	title?: string;
}
// //+ Интерфейс для конструктора
export interface IViewConstructor {
	new (container: HTMLElement, events?: IEventEmitter): IView;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

//используем утилиту Pick - выбирает указанные свойства из типа/интерфейса
export type TProductInformation = Pick<
	IProductCard,
	'image' | 'description' | 'category' | 'title' | 'price'
>;
export type TDataСustomer = Pick<IUser, 'address' | 'email' | 'phone'>;
export type TBasket = Pick<IProductCard, 'title' | 'price'>;
export type TPaymentForm = Pick<IUser, 'address'>;
export type TContactForm = Pick<IUser, 'email' | 'phone'>;
export type TSuccessfulPurchase = Pick<IProductCard, 'title' | 'price'>;
