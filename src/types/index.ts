/* eslint-disable @typescript-eslint/ban-types */

export interface IEvents {
	url: string;
	total: number,
}

export interface IBasked {
	items: string;
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
	id: string;
	payment: string;
	title: string;
	address: string | number;
	email: string | number;
	button: string;
	phone: number;
}

//Интерфейс каталога карточек с товаром
export interface IProductData {
	Product: IProductCatalog;
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
 setUserInfo(userData: IUser): void;
 checkUserValid(data:Record<keyof TDataСustomer, string>):  boolean;
}

//используем утилиту Pick - выбирает указанные свойства из типа/интерфейса
export type TProductInformation = Pick<IProductCatalog, 'image' | 'description' | 'category' | 'title' | 'price'>;
export type TBasket = Pick<IProductCatalog, 'title' | 'price'>;
export type  TDataСustomer = Pick<IUser, 'address' | 'email' | 'phone'>;
export type TPaymentForm = Pick<IUser, 'address' | 'button'>;
export type TContactForm = Pick<IUser, 'email' | 'phone' | 'button'>;
export type TSuccessfulPurchase = Pick<IProductCatalog, 'title' | 'price' | 'button'>;

