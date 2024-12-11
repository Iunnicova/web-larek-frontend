import { IApiShop, IOrder, IOrderShop, IProductCard } from '../types';
import { Api, ApiListResponse } from './base/api';

export class ApiShop extends Api implements IApiShop {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getListItem(): Promise<IProductCard[]> {
		return this.get('/product').then((data: ApiListResponse<IProductCard>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	getItem(id: string): Promise<IProductCard> {
		return this.get(`/product/${id}`).then((item: IProductCard) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	orderGoods(order: IOrder): Promise<IOrderShop> {
		return this.post('/order', order).then((data: IOrderShop) => data);
	}
}
