// import { IProductCard } from './index';
/* eslint-disable @typescript-eslint/ban-types */

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
	id: string;
	title: string;
	name?: string;
	price?: number;
	items?: string;
}

export interface IEvents {
	url: string;
	total: number;
	emit: (event: string, data?: unknown) => void;
}

export interface IBasket {
	items: Map<string, number>;
	add(id: string): void;
	total: number;
	remove(id: string): void;
	id?: string;
	data?: string;
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

export interface IFormContacts{
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
	likes: any;
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
	order: IOrder | null;
}

export interface IOrderForm {
	email: string;
	phone: string;
	name: string;
}

export interface IOrder extends IOrderForm {
	items: string[]
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
// Интерфейс отображение компонентов
// //+Интерфейс для класса отображения
export interface IView {
	render(data?: object): HTMLElement;
	id?: string;
	title?: string;
}
// //+ Интерфейс для конструктора
export interface IViewConstructor {
	new(container: HTMLElement, events?: IEventEmitter): IView;
}

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



