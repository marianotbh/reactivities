import { action, computed, observable, runInAction } from 'mobx';
import { RootStore } from '.';
import { getCurrentUser, login, register } from '../api/users';
import { history } from '../layout/history';
import { User, UserFormValue } from '../models/User';

export class UserStore {
	rootStore: RootStore;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	@observable user: User | null = null;

	@computed get isLoggedIn() {
		return Boolean(this.user);
	}

	@action login = async (values: UserFormValue) => {
		try {
			const user = await login(values);
			runInAction(() => {
				this.user = user;
				this.rootStore.commonStore.setToken(user.token);
				this.rootStore.modalStore.close();
			});
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	@action logout = () => {
		this.rootStore.commonStore.setToken(null);
		this.user = null;
		history.push('/');
	};

	@action register = async (values: UserFormValue) => {
		try {
			const user = await register(values);
			this.rootStore.commonStore.setToken(user.token);
			this.rootStore.modalStore.close();
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	@action getUser = async () => {
		try {
			const user = await getCurrentUser();
			runInAction(() => {
				this.user = user;
			});
		} catch (error) {
			console.error(error);
		}
	};
}
