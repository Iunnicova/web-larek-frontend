import {IEvents} from "./events";

// Гарда для проверки на модель
export const isModel = (obj: unknown): obj is Model<any> => {
    return obj instanceof Model;
}


 //*+Базовая модель, чтобы можно было отличить ее от простых объектов с данными

export abstract class Model<T> {
    constructor(data: Partial<T>, protected events: IEvents) {
        Object.assign(this, data);
    }

    // Сообщить всем что модель поменялась
    emitChanges(event: string, payload?: object) {
        // Состав данных можно модифицировать
        this.events.emit(event, payload ?? {});
    }

    // далее можно добавить общие методы для моделей
}

// export class ProductCard extends Model<IOrdering> {
// 	setCategoryCard(category: string) {
// 		throw new Error('Method not implemented.');
// 	}
// 	id: string;
// 	description: string;
// 	image: string;
// 	title: string;
// 	category: string;
// 	price: number | null;
// 	status: boolean;
// 	render: any;
// }