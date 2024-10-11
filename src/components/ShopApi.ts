import { IOrder, IOrderForm, IOrdering, IProduct } from '../types';
import { Api, ApiListResponse, ApiPostMethods } from './base/api';

export interface IApiShop {
	get: (uri: string) => Promise<object>;
	post: (uri: string, data: object, method: ApiPostMethods) => Promise<object>;
}

export class ApiShop extends Api implements IApiShop {
	readonly cdnUrl: string;
	options: Request;
	cdn: string;

	constructor(cdn: string, baseUrl: string, options?: Request) {
		super(baseUrl, options);
		this.cdnUrl = cdn;
	}
	orderProduct: (order: IOrder) => Promise<IOrderForm>;
	url: URL;

	getList(): Promise<IOrdering[]> {
		return this.get('/product').then((data: ApiListResponse<IOrdering>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	getItem(id: string): Promise<IProduct> {
		return this.get(`/product/${id}`).then((item: IProduct) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	orderC(order: IOrder): Promise<IOrderForm> {
		return this.post('/order', order).then((data: IOrderForm) => data);
	}
}

