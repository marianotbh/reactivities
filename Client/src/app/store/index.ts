import { configure } from 'mobx';
import { createContext } from 'react';
import { ActivityStore } from './activityStore';
import { CommonStore } from './commonStore';
import { ModalStore } from './modalStore';
import { UserStore } from './userStore';

configure({ enforceActions: 'always' });

export class RootStore {
	activityStore: ActivityStore;
	userStore: UserStore;
	commonStore: CommonStore;
	modalStore: ModalStore;

	constructor() {
		this.activityStore = new ActivityStore(this);
		this.userStore = new UserStore(this);
		this.commonStore = new CommonStore(this);
		this.modalStore = new ModalStore(this);
	}
}

export const RootStoreContext = createContext(new RootStore());
