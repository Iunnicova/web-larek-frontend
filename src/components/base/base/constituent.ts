//********************************** */
export abstract class Componentru<T> {
	protected constructor(protected readonly container: HTMLElement) { }

	// метод задает текстовое содержимое элемента HTML, получает строку.
	protected setText(link: HTMLElement | Element, value: unknown) {
		if (link instanceof HTMLElement || link instanceof Element) {
			link.textContent = String(value);
		}
	}

	// функция для включения или отключения элемента HTML. getAttribute()- метод для получения текущго значения атрибута, используйте; чтобы удалить атрибут, вызовите removeAttribute(). removeAttribute()- метод для удаления атрибута
	protected setDisabled(link: HTMLElement, state: boolean) {
		if (link) {
			if (state) link.getAttribute('disabled');
			else link.removeAttribute('disabled');
		}
	}

	//скрываtn элемент на веб-странице
	protected hiddenElementClass(link: HTMLElement, value: unknown) {
		if (link) link.classList.add(String(value));
	}

	// делает элемент видимым
	protected visibleElementClass(link: HTMLElement, value: unknown) {
		if (link) link.classList.remove(String(value));
	}

	// обновляет свойства объекта С данными и возвращает свойство объекта
	render(data?: Partial<T>): HTMLElement {
		Object.assign(this as object, data ?? {});
		return this.container;
	}
}
