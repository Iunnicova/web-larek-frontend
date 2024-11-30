
// import { EventEmitter } from './components/base/events';
// import { BasketModel } from './components/Basket';
// import { BasketView } from './components/BasketView ';
// import { Card, CatalogItem } from './components/Cards';
// import { CatalogModel } from './components/CatalogModel';
// import { ShopAPI } from './components/ShopApi';
import './scss/styles.scss';



// const api = new ShopAPI();
// const events = new EventEmitter();
// const card = new Card(events,)
// const catalogItem= new CatalogItem(events)

// const basketView = new BasketView(document.querySelector('.basket'));
// const basketModel = new BasketModel(events);
// const catalogModel = new CatalogModel(events);
// const basket = new BasketModel(events);

// //отдельные экраны с логикой формирования
// function renderBasket(items: string[]){
// basketView.render(
// 	items.map(id => {
//     const itemView = new BasketItemView(events);
//     return itemView.render(catalogModel.getProduct(id)); 
//   })	
// );
// }

// //рендерим корзину
// events.on('basket:changed', (data: { items: string[] }) => {
// 	renderBasket(data.items);
// 	// console.log('basket:changed:', data.items);
// });

// //при изменении рендерим
// events.on('basket:changed', (event: { items: string[] }) => {
// 	renderBasket(event.items);
// });

// // при действиях изменяем модель,после этого случится рендер
//   events.on('ui:basket-add', (event: { id: string }) => {
//   basketModel.add(event.id);
// });

// events.on('ui:basket-remove', (event: { id: string }) => {
//   basketModel.remove(event.id);
// });

// //подгружаем начальные данные и запускаем процессы
// api.getCatalog()
// .then(catalogModel.setItems.bind(catalogModel))
// .catch(err => console.error(err));


