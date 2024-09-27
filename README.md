# Проектная работа "Веб-ларек"

##### Ссылка на сайт

https://github.com/Iunnicova/web-larek-frontend.git

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

---

## Данные и типы данных использумые в приложении 

Каталог продукции

```
export interface IProductCatalog {
	id: string;
	description: string;
	category: string;
	image: string;
	title: string;
	button: string;
	price: number | null;
}
```

Пользовательские данные

```
export interface IUserData {
	id: string;
	payment: string;
	title: string;
	address: string | number;
	email: string | number;
	button: string;
	phone: number;
}
```

### Интерфейс для хранения каталога карточек с товаром

```
export interface ICollectionOfGoods {
	cards: IProductCatalog;
	preview: string | null;
}
```

//используем утилиту Pick - выбирает указанные свойства из типа/интерфейса

```
Информация о продукте(товаре)

```
export type IProductInformation = Pick<IProductCatalog, 'image' | 'description' | 'category' | 'title' | 'price'>;
```

Корзина
```
export type IBasket = Pick<IProductCatalog, 'title' | 'price'>;
```

Форма для оплаты
```
export type IPaymentForm = Pick<IUserData, 'address' | 'button'>;
```

Контактная информация
```

export type IContactForm = Pick<IUserData, 'email' | 'phone' | 'button'>;
```

Завершение покупки
```
export type ISuccessfulPurchase = Pick<IProductCatalog, 'title' | 'price' | 'button'>;
```
