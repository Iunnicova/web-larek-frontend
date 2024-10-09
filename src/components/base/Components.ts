export abstract class Component<T> {
	constructor(protected readonly container: HTMLElement) {
	}

	 // Инструментарий для работы с DOM в дочерних компонентах

	 // Переключить класс
// 	 toggleClass(element: HTMLElement, className: string, force?: boolean) {
// 		element.classList.toggle(className, force);
// }

// Установить текстовое содержимое
protected setText(element: HTMLElement, value: unknown) {
		if (element) {
				element.textContent = String(value);
		}
}

// включение и отключение элемента HTML
protected setDisabled(data: HTMLElement, state: boolean) {
	if (data) {
		if (state) data.getAttribute('disabled');
		else data.removeAttribute('disabled');
	}
}

// Показать элемент
protected visibleElement(element: HTMLElement) {
	element.style.removeProperty('display');
}

// Скрыть элемент
protected hiddenElement(element: HTMLElement) {
		element.style.display = 'none';
}

// // Установить изображение с алтернативным текстом
// protected setImage(element: HTMLImageElement, src: string, alt?: string) {
// 		if (element) {
// 				element.src = src;
// 				if (alt) {
// 						element.alt = alt;
// 				}
// 		}
// }

	//Обновляет и возвращает корневой DOM-элемент
	render(data?: Partial<T>): HTMLElement {
			Object.assign(this as object, data ?? {});
			return this.container;
	}
}
