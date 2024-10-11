import './scss/styles.scss';
// import { API_URL, CDN_URL, settings } from './utils/constants';
// import { Basket } from './components/Basket';
import { EventEmitter } from './components/base/events';
// import {  BasketView } from './components/BasketView ';
import { cloneTemplate, ensureElement } from './utils/utils';
// import { CatalogModel } from './components/CatalogModel';
// import { Api } from './components/base/api';
import {
	AppState,
	// CatalogChangeEvent,
	// IOrdering,
} from './components/AppData';
import { Page } from './components/Page';
// import { Modal } from './components/Modal';
// import { ApiShop } from './components/ShopApi';
// import { Order } from './components/Order';
// import { Card } from './components/Cards';


const events = new EventEmitter();
// const api = new ApiShop(CDN_URL, API_URL);

//Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

// const cardTemplate: HTMLTemplateElement =
// 	document.querySelector('.card-template');

// const templateSuccessTemplate = ensureElement<HTMLTemplateElement>('#success');
const templateCardCatalog = ensureElement<HTMLTemplateElement>('#card-catalog');
// const templateCardPreview = ensureElement<HTMLTemplateElement>('#card-preview');
// const templateCardBasket = ensureElement<HTMLTemplateElement>('#card-basket');
// const templateBasket = ensureElement<HTMLTemplateElement>('#basket');
// const templateOrder = ensureElement<HTMLTemplateElement>('#order');
// const templateContacts = ensureElement<HTMLTemplateElement>('#contacts');

// const basketView = new BasketView(document.querySelector('.basket'));

// const view = new BasketItemView();
// const basketModel = new BasketModel(events);
// const catalogModel = new CatalogModel();
// const basket = new Basket(events);

// Модель данных приложения
const appData = new AppState({}, events);

// Глобальные контейнеры
const page = new Page(document.body, events);
// const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

// Переиспользуемые части интерфейса
// const bids = new Basket(cloneTemplate(bidsTemplate), events);
// const basket = new Basket(cloneTemplate(basketTemplate), events);
// const order = new Order(cloneTemplate(cardTemplate), events);
// events.on('basket:change', (data: { items: string[] }) => {
// 	console.log(data);
// });

// Изменились элементы каталога
events.on('items:changed', () => {
	page.catalog = appData.catalog.map((item) => {
		const card = new OrderingСards(cloneTemplate(templateCardCatalog), {
			onClick: () => events.emit('preview:changed', item),
		});
		card.setCategoryCard(item.category);
		return card.render({
			title: item.title,
			image: item.image,
			price: item.price,
			category: item.category,
		});
	});
});

// events.on<CatalogChangeEvent>('items:changed', () => {
// 	page.catalog = appData.catalog.map(item => {
// 			const card = new IOrderingСards(cloneTemplate(templateCardCatalog), {
// 					onClick: () => events.emit('card:select', item)
// 			});
// 			return card.render({
// 					title: item.title,
// 					image: item.image,
// 					description: item.about,
// 					status: {
// 							status: item.status,
// 							label: item.statusLabel
// 					},
// 			});
// 	});

// 	page.counter = appData.getClosedLots().length;
// });

// events.on('show:products', () => {
// 	const cards = appState.getProducts().map((item) => {
// 		const card = new Card(cloneTemplate(templateCardCatalog), {
// 			onClick: () => {
// 				events.emit('card:select', item);
// 			},
// 		});

// 		return card.render({
// 			category: item.category,
// 			title: item.title,
// 			image: item.image,
// 			price: item.price,
// 		});
// 	});

//***Действие слушателя собития */
// при ихменении рендерим
// events.on('basket:change', (event: { items: string[] }) => {
// 	renderBasket(event.items);
// });

// function renderBasket(items: string[]) {
// 	throw new Error('Function not implemented.');
// }

// // //можно собрать в функции или классы отдельные экраны с логикой их формирования
// function renderBasket(items: string[]) {
// 	basketView.render(
// 			items.map((id) => {
// 					const itemView = new BasketItemView(events);
// 					try {
// 							return itemView.render(catalogModel.getProduct(id));
// 					} catch (error) {
// 							console.error(error.message);
// 							return null;
// 					}
// 			})
// 	);
// }
