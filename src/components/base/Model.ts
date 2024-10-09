import { IEvents } from './events';

export const isModel = (obj: unknown): obj is Model<any> => {
	return obj instanceof Model;
};

export abstract class Model<T> {
	constructor(data: Partial<T>, protected events: IEvents) {
		Object.assign(this, data);
	}
}

export abstract class BModel<T> {
	constructor(data: Partial<T>, protected events: IEvents) {
			Object.assign(this, data);
	}}


