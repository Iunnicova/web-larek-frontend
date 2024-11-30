
// import { ICatalogModel, IProduct } from '../types';
// import { EventEmitter } from './base/events';

// // //Описание товара
// // interface IProduct {
// // 	id: string;
// // 	title: string;
// // }

// // //Хранение списка товаров
// // interface ICatalogModel {
// // 	items: IProduct[];
// // 	setItems(items: IProduct[]): void; //устанавливаем после загрузки API
// // 	getProduct(id: string): IProduct; //получаем при рендере списки
// // }

// export class CatalogModel implements ICatalogModel {
// 	private events;
// 	items: IProduct[] = [];

// 	constructor(events: EventEmitter) {
// 		this.events = events;
// 	}

// 	setItems(items: IProduct[]): void {
// 		this.items = items;
// 	}

// 	getProduct(id: string): IProduct {
// 		const product = this.items.find((product) => product.id === id);
// 		if (!product) {
// 			throw new Error('уупс');
// 		}
// 		return product;
// 	}
// }

// // export class CatalogModel implements ICatalogModel {
// // 	items: IProduct[] = [];

// // 	setItems(items: IProduct[]): void {
// // 			this.items = items;
// // 	}

// // 	getProduct(id: string): IProduct {
// // 			const product = this.items.find(product => product.id === id);
// // 			if (!product) {
// // 					throw new Error("Ppppp");
// // 			}
// // 			return product;
// // 	}
// // }
