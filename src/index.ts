import './scss/styles.scss';
import { API_URL, CDN_URL, settings } from './utils/constants';
import { Basket } from './components/Basket';
import { EventEmitter } from './components/base/events';
import { BasketView } from './components/BasketView ';
import { cloneTemplate, ensureElement } from './utils/utils';
import { CatalogModel } from './components/CatalogModel';
import { Api } from './components/base/api';


// const view = new BasketItemView();
const events = new EventEmitter();

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
})

const cardTemplate: HTMLTemplateElement = document.querySelector('.card-template');

const templateSuccessTemplate = ensureElement<HTMLTemplateElement>('#success');
const templateCardCatalog = ensureElement<HTMLTemplateElement>('#card-catalog');
const templateCardPreview = ensureElement<HTMLTemplateElement>('#card-preview');
const templateCardBasket = ensureElement<HTMLTemplateElement>('#card-basket');
const templateBasket = ensureElement<HTMLTemplateElement>('#basket');
const templateOrder = ensureElement<HTMLTemplateElement>('#order');
const templateContacts = ensureElement<HTMLTemplateElement>('#contacts');

// const api = new ShopAPI(CDN_URL, API_URL);
const basketView = new BasketView(document.querySelector('.basket'));
// const basketModel = new BasketModel(events);
const catalogModel = new CatalogModel();
const basket = new Basket(events);


events.on('basket:change', (data: { items: string[] }) => {
  console.log(data);
});

// показывать товары на главной странице
// events.on('items:changed', () => {
// 	page.catalog = appData.catalog.map((item) => {
// 		const card = new CatalogItem(cloneTemplate(templateCardCatalog), {
// 			onClick: () => events.emit('preview:changed', item),
// 		});
// 		card.setCategoryCard(item.category);
// 		return card.render({
// 			title: item.title,
// 			image: item.image,
// 			price: item.price,
// 			category: item.category,
// 		});
// 	});
// });






//***Действие слушателя собития */
// при ихменении рендерим
events.on('basket:change', (event: { items: string[] }) => {
	renderBasket(event.items);
});

function renderBasket(items: string[]) {
	throw new Error('Function not implemented.');
}
