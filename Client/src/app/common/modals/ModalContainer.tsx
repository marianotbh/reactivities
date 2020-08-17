import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { FC } from 'react';
import { Modal } from 'semantic-ui-react';
import { RootStoreContext } from '../../store';

const ModalContainer: FC = () => {
	const {
		modalStore: {
			modal: { isOpen, body },
			close
		}
	} = useContext(RootStoreContext);

	return (
		<Modal open={isOpen} onClose={close} size="mini">
			<Modal.Content>{body}</Modal.Content>
		</Modal>
	);
};

export default observer(ModalContainer);
