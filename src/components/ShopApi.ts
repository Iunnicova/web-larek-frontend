import { IOrder, IOrderShop, IProductCard } from '../types';
import { Api, ApiListResponse } from './base/api';

export class ApiShop extends Api implements ApiShop {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	//*+Получает список продуктов по API 
	getListItem(): Promise<IProductCard[]> {
		return this.get('/product').then((data: ApiListResponse<IProductCard>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	//*+Получает продукт по его ID.
	getItem(id: string): Promise<IProductCard> {
		return this.get(`/product/${id}`).then((item: IProductCard) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	//*+Отправляет заказ на сервер 
	orderGoods(order: IOrder): Promise<IOrderShop> {
		return this.post('/order', order).then((data: IOrderShop) => data);
	}
}
