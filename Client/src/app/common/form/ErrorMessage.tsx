import { FC } from 'react';
import { AxiosResponse } from 'axios';
import React from 'react';
import { Message } from 'semantic-ui-react';

type Props = {
	error: AxiosResponse;
	text?: string;
};

const ErrorMessage: FC<Props> = ({ error, text }) => {
	return (
		<Message error>
			<Message.Header>{error.statusText}</Message.Header>
			{error.data && Object.keys(error.data.errors).length > 0 && (
				<Message.List>
					{Object.values(error.data.errors)
						.flat()
						.map((err, i) => (
							<Message.Item key={i}>{String(err)}</Message.Item>
						))}
				</Message.List>
			)}
			{text && <Message.Content>{text}</Message.Content>}
		</Message>
	);
};

export default ErrorMessage;
