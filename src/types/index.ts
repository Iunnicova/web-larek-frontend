
export interface IProductCatalog {
	id: string;
	description: string;
	category: string;
	image: string;
	title: string;
	button: string;
	price: number | null;
}

export interface IUserData {
	id: string;
	payment: string;
	title: string;
	address: string | number;
	email: string | number;
	button: string;
	phone: number;
}

//Интерфейс для хранения каталога карточек с товаром
export interface ICollectionOfGoods {
	cards: IProductCatalog;
	preview: string | null;
}

//используем утилиту Pick - выбирает указанные свойства из типа/интерфейса
export type IProductInformation = Pick<IProductCatalog, 'image' | 'description' | 'category' | 'title' | 'price'>;
export type IBasket = Pick<IProductCatalog, 'title' | 'price'>;
export type IPaymentForm = Pick<IUserData, 'address' | 'button'>;
export type IContactForm = Pick<IUserData, 'email' | 'phone' | 'button'>;
export type ISuccessfulPurchase = Pick<IProductCatalog, 'title' | 'price' | 'button'>;

