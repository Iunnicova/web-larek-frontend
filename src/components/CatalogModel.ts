import { IProduct } from "../types";

//интерфейс для хранения списков товаров
interface ICatalogModel {
	items: IProduct[];
	setItems(items: IProduct[]): void; //чтобы установить после загрузки из апи
	getProduct(id: string): IProduct; //чтобы получить при рендере списка
}

export class CatalogModel implements ICatalogModel {
	items: IProduct[] = [];
	setItems(items: IProduct[]): void {
			this.items = items;
	}

	getProduct(id: string): IProduct {
			const product = this.items.find(item => item.id === id);
			if (!product) {
					throw new Error(`Product with ID ${id} not found`);
			}
			return product;
	}

	getProducts(): IProduct[] {
			return this.items;
	}
}



