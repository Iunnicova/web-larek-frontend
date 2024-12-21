import { IPaymentModel } from '../../types';
import { IEvents } from './events';

// interface IPaymentModel {
//   payment: string
// }

// Гарда для проверки на модель
export const isModel = (obj: unknown): obj is Model<never> => {
	return obj instanceof Model;
};

//*+Базовая модель, чтобы можно было отличить ее от простых объектов с данными

export abstract class Model<T extends IPaymentModel> {
	payment: string;
	constructor(data: Partial<T>, protected events: IEvents) {
		Object.assign(this, data);
	}

	// Сообщить всем что модель поменялась
	emitChanges(event: string, payload?: object) {
		// Состав данных можно модифицировать
		this.events.emit(event, payload ?? {});
	}
}
