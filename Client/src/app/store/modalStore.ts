import { action, observable } from 'mobx';
import { RootStore } from '.';

export class ModalStore {
	rootStore: RootStore;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	@observable.shallow modal = {
		isOpen: false,
		body: null as null | JSX.Element
	};

	@action open = (body: JSX.Element) => {
		this.modal.isOpen = true;
		this.modal.body = body;
	};

	@action close = () => {
		this.modal.isOpen = false;
		this.modal.body = null;
	};
}
