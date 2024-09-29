import { IProductCatalog } from './index';
/* eslint-disable @typescript-eslint/ban-types */

export interface IEvents {
	url: string;
	total: number;
}

export interface IBasked {
	items: Map<string, number>;
	add(id: string): void;
	remove(id: string): void;
	total: number;
}

export interface IProductCatalog {
	id: string;
	description: string;
	category: string;
	image: string;
	title: string;
	button: string;
	price: number | null;
}

export interface IUser {
	payment: string;
	address: string;
	email: string | number;
	phone: number;
}

export interface IProduct {
	id: string;
	title: string;
}

//Интерфейс Модели для хранения данных товара
export interface ICatalogModel {
	items: IProduct;
	setItems(items: IProduct[]): void;
	getProduct(id: string): IProduct;
}

// Интерфейс отображение компонентов
//+Интерфейс для класса отображения
export interface IView {
	render(data?: object): HTMLElement;
}
//+ Интерфейс для конструктора
export interface IViewConstructor {
	new (container: HTMLElement, events?: IEventEmitter): IView;
}

//Интерфейс для хранения событий

//Интерфейс каталога карточек с товаром
export interface IProductData {
	product: IProductCatalog;
	preview: string | null;
	addProduct(product: IProductCatalog): void;
	deleteProduct(productId: string, payload: Function | null): void;
	updateProduct(product: IProductCatalog, payload: Function | null): void;
	getProducts(productId: string): IProductCatalog;
	//*утилита Record позволяет  нам описать какойто объект когда мы еще точно не знаем какие будут свойства
	checkValid(data: Record<keyof TProductInformation, string>): boolean;
}

// Интерфейс данных пользователя
export interface IUserData {
	getUserInfo(): TDataСustomer;
	checkUserValid(data: Record<keyof TDataСustomer, string>): boolean;
}

//используем утилиту Pick - выбирает указанные свойства из типа/интерфейса
export type TProductInformation = Pick<
	IProductCatalog,
	'image' | 'description' | 'category' | 'title' | 'price'
>;
export type TBasket = Pick<IProductCatalog, 'title' | 'price'>;
export type TDataСustomer = Pick<IUser, 'address' | 'email' | 'phone'>;
export type TPaymentForm = Pick<IUser, 'address' | 'button'>;
export type TContactForm = Pick<IUser, 'email' | 'phone' | 'button'>;
export type TSuccessfulPurchase = Pick<
	IProductCatalog,
	'title' | 'price' | 'button'
>;
