import { AppData } from './components/AppData';
import { EventEmitter } from './components/base/events';
import { Basket } from './components/Basket';
import { Card } from './components/Card';
import { Contacts } from './components/Contacts';
import { Modal } from './components/Modal';
import { Order } from './components/Order';
import { Page } from './components/Page';
import { ApiShop } from './components/ApiShop';
import { Success } from './components/Success';
import './scss/styles.scss';
import {
	ICommodityItem,
	IFormOrder,
	IOrder,
	IProductCard,
	paymentSelection,
} from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, createElement, ensureElement } from './utils/utils';
import { CardBasket } from './components/CardBasket';
// import { CardBasket } from './components/CardBasket';

const events = new EventEmitter();
const api = new ApiShop(CDN_URL, API_URL);

const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

const modalElement = ensureElement<HTMLElement>('#modal-container');

const pageElement = ensureElement<HTMLElement>('.page');

const appData = new AppData({}, events);
const order = new Order(cloneTemplate(orderTemplate), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const page = new Page(pageElement, events);
const modal = new Modal(modalElement, events);
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);
const success = new Success(cloneTemplate(successTemplate), {
	onClick: () => {
		modal.close();
	},
});

//*+обрабатывает событие изменения каталога и рендерит карточки товаров
events.on<IProductCard>('catalog:changed', () => {
	const card = appData.getCatalog().map((item) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), {
			onClick: () => {
				events.emit('card:select', item);
			},
		});

		page.counter = appData.getGoodsBasket().length;

		return card.render({
			title: item.title,
			image: item.image,
			category: item.category,
			price: item.price,
		});
	});
	page.gallery = card;
});

//*+отправкa данных готового заказа на сервер
events.on('contacts:submit', () => {
	api
		.orderGoods(appData.getOrder())
		.then((result) => {
			if (result && typeof result.total === 'number') {
				modal.render({
					content: success.render({
						description: result.total,
					}),
				});

				appData.clearBasket();
				page.counter = appData.getGoodsBasket().length;
				events.emit('basket:changed');
			} else {
				console.error(result);
			}
		})
		.catch((err) => {
			console.error(err);
		});
});

//*+ Изменение способа оплаты
events.on('payment:changed', (data: { target: paymentSelection }): void => {
	appData.orderPaymentMethod(data.target);
});

//*+обновляеm состояние валидности и сообщения об ошибках
events.on('errorForm:change', (errors: Partial<IOrder>) => {
	const { payment, address } = errors;
	const { email, phone } = errors;

	order.valid = !payment && !address;
	order.errors = Object.values({ payment, address })
		.filter((i) => !!i)
		.join('; ');

	contacts.valid = !email && !phone;
	contacts.errors = Object.values({ email, phone })
		.filter((i) => !!i)
		.join('; ');
});

//*+ поле в форме заказа изменяется
events.on(
	/^order\..*:change/,
	(data: { field: keyof IFormOrder; value: string }) => {
		appData.setOrderField(data.field, data.value);
	}
);

//*+изменениe поля в форме контактов
events.on(
	/^contacts\..*:change/,
	(data: { field: keyof IFormOrder; value: string }) => {
		appData.choosePaymentMethod(data.field, data.value);
	}
);

//*+Открыть форму заказа
events.on('order:open', () => {
	modal.render({
		content: order.render({
			payment: null,
			address: '',
			valid: false,
			errors: [],
		}),
	});
});

//*+отображение формы контактов
events.on('order:submit', () => {
	modal.render({
		content: contacts.render({
			email: '',
			phone: '',
			errors: [],
			valid: false,
		}),
	});
});

//*+обратывает событие добавления товара в корзину и рендерит карточки товаров в корзине
events.on('card:select', (item: ICommodityItem) => {
	appData.setViewing(item);
});

//*+обработает событие изменения корзины и рендерит карточки товаров в корзине
events.on('viewing:changed', (item: ICommodityItem) => {
	const card = new Card(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			const statusBasket = appData.getGoodsBasket();
			const isInBasket = statusBasket.some(
				(basketItem) => basketItem.id === item.id
			);

			if (isInBasket) {
				appData.fromBasket(item);
			} else {
				appData.inBasket(item);
			}

			events.emit('basket:changed');
			modal.close();
		},
	});

	modal.render({
		content: card.render({
			image: item.image,
			category: item.category,
			title: item.title,
			description: item.description,
			price: item.price,
			buttonLabel: item.statusBasket,
		}),
	});
});

//*+ отвечает за обработку добавления товара в корзину
events.on('basket:changed', () => {
	const goodsBasket = appData.getGoodsBasket();
	page.counter = goodsBasket.length;

	const basketContainer = goodsBasket.map((item, index) => {
		const card = new CardBasket(cloneTemplate(cardBasketTemplate), {
			onClick: () => {
				appData.fromBasket(item);
				events.emit('basket:changed');
			},
		});

		return card.render({
			index: index + 1,
			title: item.title,
			price: item.price,
		});
	});

	basket.items = Array.from(basketContainer);
	basket.total = appData.getTotal();
});

// *+отвечает за обработку заказа
events.on('basket:open', () => {
	modal.render({
		content: createElement<HTMLElement>('div', {}, [basket.render()]),
	});
});

//*+ Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
	page.locked = true;
});

//*+разблокируем прокрутку страницы если открыта модалка
events.on('modal:close', () => {
	page.locked = false;
});

//*+отправляет запрос на сервер для получения списка товаров
api
	.getListItem()
	.then(appData.setCatalog.bind(appData))
	.catch((err) => {
		console.error(err);
	});
