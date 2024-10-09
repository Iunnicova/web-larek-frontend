import { IBasket, IEventEmitter } from '../types';
import '../index';

export class Basket implements IBasket {
	constructor(protected events: IEventEmitter) {
		this.items = new Map<string, number>();
		// this.total = 0;
		// this.id = '';
		// this.data = '';
	}
	items: Map<string, number>;
	total: number;
	id: string;
	data: string;

	//Метод добавления товара +1
	add(_id: string): void {
		this._changed();
		if (this.items.has(_id)) {
			this.items.set(_id, this.items.get(_id)! + 1);
	} else {
			this.items.set(_id, 1);
	}
	}

	//Метод удаления товара -1
	remove(id: string): void {
		this._changed();
		if (this.items.has(id)) {
			const currentQuantity = this.items.get(id)!;
			if (currentQuantity > 1) {
					this.items.set(id, currentQuantity - 1);
			} else {
					this.items.delete(id);
			}
		}
	}
		// метод вызывается при изменинии количиства товара в корзине
			protected _changed() {
				this.events.emit('basket:change', { items: Array.from(this.items.keys()) });
	}
	}






