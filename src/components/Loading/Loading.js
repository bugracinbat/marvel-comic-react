import React from 'react';
import { Modal, ModalBody, Spinner } from 'reactstrap';

const Loading = () => {
	return (
		<Modal isOpen={true} centered={true}>
			<ModalBody style={{ display: 'flex', justifyContent: 'center' }}>
				<Spinner style={{ width: '3rem', height: '3rem' }} color="danger" />
			</ModalBody>
		</Modal>
	);
};

export default Loading;
