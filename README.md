# Проектная работа "Веб-ларек"

## Краткая информация

Проект разрабатывается в рамках учебного курса "Frontend-developer"

Демо проекта
https://github.com/Iunnicova/web-larek-frontend.git

##### Ссылка на сайт

https://github.com/Iunnicova/web-larek-frontend

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

### Карточка товара

```
interface IProductCard {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}
```

### Описание заказа

```
 interface ICardData extends IProductCard {
	buttonLabel: boolean;
	index: number;
}
```

### Структура заказа

```
 interface IOrder extends IFormOrder {
	payment: PaymentSelection;
}
```

### статус товара в корзине

```
 interface ICommodityItem extends IProductCard {
	statusBasket: boolean;
}
```

### Формы заказа

```
interface IFormOrder {
	address: string;
	email: string;
	phone: string;
}
```

### Представление корзины

```
interface IBasketView {
	selected: string[];
	items: HTMLElement[];
	total: number;
}
```

### Действие при клике

```
interface IAction {
	onClick: () => void;
}
```

### Данныe приложения

```
interface IAppData {
	products: ICommodityItem[];
	basket: ICommodityItem[];
	order: IOrder;
	payment: IPaymentModel;
}
```

### Ошибки валидации форм

type ErrorForm = Partial<Record<keyof IOrder, string>>;

```

```

### хранит информацию о выбранном способе оплаты

```
interface IPaymentModel {
	payment: string;
}
```

### Cостояние формы

```
interface IFormState {
	valid: boolean;
	errors: string[];
}
```

### Данные для модального окна

```
interface IModalData {
	content: HTMLElement;
}
```

### Данные страницы

```
interface IPageData {
	counter: number;
	_catalog: HTMLElement[];
	locked: boolean;
}
```

### API интерфейс магазина

```
interface IApiShop {
	getListItem: () => Promise<IProductCard[]>;
	getItem: (id: string) => Promise<IProductCard>;
	orderGoods: (order: IOrder) => Promise<IOrderShop>;
}
```

### Модель заказа в магазине

```
interface IOrderShop {
	id: string;
	total: number;
}
```

### Успешный результат

```
export interface ISuccess {
	description: number;
}
```

### Представление корзины

```
export type PaymentSelection = 'card' | 'cash';
```

### Описание события

```
export interface IPaymentChangedEvent {
  target: string;}
```

## Архитектура приложения

Код разделен на слои MVP:

- слой представления, отвечает за отображение данных на странице
- слой данных, отвечает за хранение и изменения данных
- презентер, отвечает за связь представления и данных

### Базовый код

#### Класс Api

Содержит в себе базовую логику отправки запросов. В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов\
Методы:

- `get` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер
- `post` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове

---

#### Класс Component

Класс для работы с DOM в дочерних компонентах- обеспечивает базовый функционал для создания и управления элементами интерфейса\
 Конструктор инициализирует свойство с помощью HTMLElement\
 Методы:

`toggleClass` Переключаем класс у элемента

`setText` Устанавливаем текстовое содержимое элемента

`setDisabled` Меняем статус блокировки элемента

`setHidden` Скрываем элемент

`setVisible` Показываем элемент

`setImage` Установаем текст

`render` Возвращаем корневой DOM-элемент

`hiddenElementClass` Добавляем класс для скрытия элемента

---

#### Класс IEvents

Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется в презентере для обработки событий и в слоях приложения для генерации событий
Основные методы, реализуемые классом описаны интерфейсом `IEvents`:

- `on` - Подписка на событие
- `emit` - Инициализация события
- `trigger` - Возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие

---

#### Класс Model

Абстрактный класс,который позволяет создавать модели, которые могут отправлять события и иметь свои собственные данные

`isModel` Проверяем является ли объект экземпляром класса `Model`\
 `Object.` Копируем свойства из `data` в экземпляр класса\
 `emitChanges` Метод предназначен для уведомления об изменениях в модели

    //*уведомляет презентер о том, что данные изменены
    //обновляет свойство модели и выдает событие с новым платежом
    changePayment(value: unknown) {
    	if (typeof value === 'string') {
    		this.payment = value;
    		this.events.emit('errorForm:change', { payment: value });
    	} else {
    		console.warn(value);
    	}
    }

## Слой данных

#### Класс AppData

Класс наследуется от базового класса Model, предоставляет методы реализующие взаимодействие с бэкендом сервиса.

`setViewing` Устанавливаем идентификатор товара, который сейчас просматривается\
`setCatalog` Устанавливаем массив товаров\
`updateBasket` Обновляем корзину товаров\
`getCatalog` Возвращаем массив товаров\
`getOrder` Возвращаем объект заказа\
`inBasket` Добавляем товар в корзину\
`fromBasket` Удаляем товар из корзину\
`getTotal` Возвращаем общую стоимость товаров в корзине\
`getGoodsBasket` Возвращаем массив товаров в корзине\
`clearBasket` Очищаем корзину\
`setOrderField` Устанавливаем поле заказа\
`orderPaymentMethod` Устанавливает выбранный способ оплаты заказа и валидирует\
`choosePaymentMethod` Устанавливает значение указанного поля контактной информации заказа\
`validateOrder` Проверяем форму заказа на ошибки

#### Класс Basket

Класс наследуется от базового класса Components, отображает корзину и товар который в ней находится.

Конструктор принимает родительский элемент в качестве
аргумента объект `EventEmitter`

Поля класса:  
`_list` ` _total` ` _button`- Защищенные поля, представляющие HTMLElement для отображения списка товаров, общей стоимости и кнопки оформления заказа

Сеттеры :\
`items` Устанавливает список товаров в корзине\
`setButtonClass` Управляет доступностью кнопки оформления заказа в зависимости от наличия выбранных товаров\
 `total` Форматирует и устанавливает текст общей стоимости

#### Класс CardBasket

Расширяет класс Card, предназначен для представления элемента карточки товара в корзине покупок

Поля класса:
`_index` Защищенное поле, предназначен для отображения индекса и стоимости в карточке

Сеттеры:
`index` Сеттер предназначен для установки значения индекса. Если значение отрицательное число, сеттер ничего не делает и не изменяет отображение.

#### Класс Card

Класс наследуется от базового класса Components.Представляет собой компонент карточки товара. Он отвечает за отображение данных о товаре, таких как название, описание, категория, изображение и цена.

Поля класса:

`_title`, `_category`, `_description`, `_button`, `_image`, `_price` Защищенные поля, которые представляют собой HTMLElement

Сеттеры :
`title` Устанавливаем текст заголовка\
`description` Устанавливаем текст описания\
`category` Устанавливаем категорию товара, удаляя предыдущие классы \
`buttonLabel` Устанавливаем текст кнопки
`image` Устанавливаем изображение товара
`price` Устанавливаем цену

`categoryClasses` Добавляем текущую категорию к кнопке, если она есть в списке категорий, и расматриваем вариант в дальнейшем легко добавлять новые категории

#### Класс Contact

Является наследником класса Form
класс нужен для работы с формой контактов
включает в себя информацию о контактах покупателя, при неверном заполнение выскакивает ошибка

Поля класса:\
`_email`,` _phone` защищенные поля, предназначенные для хранения ссылок на соответствующие HTMLInputElement, HTMLFormElement ввода (email и телефон)/
Метод:
`inputElement` нужен для извлечения элемента ввода из формы

### Класс Form

Представляет собой компонент формы, который обрабатывает изменения ввода, отправку формы и отображение ошибок\
Поля класса:\
`form` хранит элемент формы\
`_submit` указывает на кнопку отправки формы\
`_errors` отображаются ошибки при отправке

Сеттеры:\
`errors` устанавливает текст ошибок, используя метод setText\
`valid` управляет доступностью кнопки отправки формы\
`displayErrors` обновляет текст ошибок \
`render` перерисовывает форму с указанными свойствами

#### Класс Modal

Представляет собой компонент модального окна
Поля класса:
`_button` HTMLElement, используемая для закрытия модального окна
`_content` Элемент, в который будет помещено содержимое модала
Сеттер:
`content`Устанавливает новое содержимое модального окна

Методы:
`open` делает модальное окно видимым
`close` освобождает содержимое
`render` рендерит содержимое

#### Класс Order

Класс Order наследуется от класса Form. Отвечает за взаимодействие с элементами формы, которые относятся к заказу, включая кнопки для выбора способа оплаты и поле для ввода адреса доставки.
Сеттер:

`address` Устанавливает адрес в поле ввода адреса

`setButtonClass`Выбирает кнопку платежа по имени и добавляет или удаляет класс на кнопке.

### Класс Page

Часть интерфейса для веб-приложения, представляет страницу с товаром и корзиной

Поля класса:

`_gallery` элемент представляющий галерею на странице\
`_wrapper` обертка страницы, которая может блокироваться\
`_counter` элемент для отображения количества товаров в корзине\
`_locked` логическая переменная для состояния блокировки  
`_basketCounter` элемент, представляющий кнопку для открытия корзины
Сеттер:

`counter` Устанавливает текстовое значение в элемент и, преобразуя его в строку\
`gallery` Заменяет на массив элементов, переданных в качестве аргумента  
`locked` Добавляет или удаляет класс

### Класс Success

Отвечает за отображение информации об успешном завершении заказа\
Поля класса:\
`_description` элемент, содержащий текстовое описание успешного выполнения заказа\
`_button` кнопка, предназначенная для закрытия или завершения отображения успешного сообщения
Сеттеры:\
`description` Получяет и устанавлвает описания заказа

## Слой коммуникации

#### Класс ApiShop

ApiShop расширяет базовый класс Api и предоставляет методы для работы с продуктами и заказами в магазине
Поля класса:
`cdn` строка, представляющая базовый URL для контента
Методы:
`getListItem` Получает список продуктов по API
`getItem` Получает продукт по его ID
`orderGoods` Отправляет заказ на сервер

## Взаимодействие компонентов

Код, описывающий взаимодействие представления и данных между собой находится в файле index.ts, выполняющем роль `презентера`\
Взаимодействие осуществляется за счет событий генерируемых с помощью брокера событий и обработчиков этих событий, описанных в index.ts\
В index.ts сначала создаются экземпляры всех необходимых классов, а затем настраивается обработка событий

### События изменения данных

`payment:changed` изменение способа оплаты
`catalog:changed` изменение состояние каталога товаров  
`card:select` выбор карточки товар  
`contacts:submit` отправка данных готового заказа на сервер  
`basket:changed` в корзине происходит изменение\
`errorForm:change` обновление состояния валидности и сообщения об ошибках  
`order:open` открытие формы заказа  
`viewing:changed` изменение состояния просмотра  
`basket:open` открытия корзины  
`modal:open` открывает модальное окно  
`modal:close` закрытия модального окна
`^(order|contacts)\..*:change` изменение полей в формах заказа и контактов
`order:submit` отображение формы контактов
