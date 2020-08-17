import { action, observable, reaction } from 'mobx';
import { RootStore } from '.';

export class CommonStore {
	rootStore: RootStore;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;

		reaction(
			() => this.token,
			token => {
				if (token) {
					localStorage.setItem('token', token);
				} else {
					localStorage.removeItem('token');
				}
			}
		);
	}

	@observable token: string | null = localStorage.getItem('token');
	@observable appLoaded = false;

	@action setToken = (token: string | null) => {
		this.token = token;
	};

	@action setAppLoaded = () => {
		this.appLoaded = true;
	};
}
