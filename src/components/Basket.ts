// // import { IBasket } from '../types';
// import '../index';
// import {  IEventEmitter } from '../types';

// //Корзина товаров + -
// interface IBasketModel {
// 	items: Map<string, number>;
// 	add(id: string): void;
// 	remove(id: string): void;
// }


// export class BasketModel implements IBasketModel {
// 	constructor(protected events: IEventEmitter) {}
// 	items: Map<string, number>;

// 	//добавление товара +1
// 	add(id: string): void {
// 		this._changed();
// 	}

// 	//удаление товара -1
// 	remove(id: string): void {
// 		this._changed();
// 	}

// 	//Метод генерирующий уведомление об изменении + - 1 товар в корзине
// 	protected _changed() {
// 		this.events.emit('basket:change', { items: Array.from(this.items.keys()) });
// 	}
// }



